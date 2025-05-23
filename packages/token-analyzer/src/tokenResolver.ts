import {
  Node,
  PropertyAssignment,
  SpreadAssignment,
  StringLiteral,
  PropertyAccessExpression,
  ObjectLiteralExpression,
  CallExpression,
  TemplateExpression,
  Identifier,
} from 'ts-morph';
import { TokenReference, TokenResolverInfo } from './types';
import {
  addTokenToArray,
  getInitializerFromIdentifier,
  getPropertiesForShorthand,
  isTokenReference,
} from './tokenUtils';
import { extractNodesFromTemplateStringLiteral } from './processTemplateStringLiteral';

/**
 * Function that centarlizes the logic for resolving tokens from a node.
 * Given that this is recursive logic, it's much easier to pass this back to itself.
 * @param node
 * @returns
 */
export const resolveToken = (info: TokenResolverInfo): TokenReference[] => {
  const { node, tokens } = info;

  if (Node.isStringLiteral(node)) {
    // Path in the event we need to process string literals, however this isn't used given tokens are stored as
    // initialized values and imports. Generally, as property accessors or identifiers
    // For now we'll leave a stub
    return processStringLiteral(info as TokenResolverInfo<StringLiteral>);
  } else if (Node.isTemplateExpression(node)) {
    return processTemplateExpression(info as TokenResolverInfo<TemplateExpression>);
  } else if (Node.isIdentifier(node)) {
    return processIdentifier(info as TokenResolverInfo<Identifier>);
  } else if (Node.isPropertyAccessExpression(node)) {
    return processPropertyAccess(info as TokenResolverInfo<PropertyAccessExpression>);
  } else if (Node.isObjectLiteralExpression(node)) {
    return processObjectLiteral(info as TokenResolverInfo<ObjectLiteralExpression>);
  } else if (Node.isSpreadAssignment(node)) {
    return processSpreadAssignment(info as TokenResolverInfo<SpreadAssignment>);
  } else if (Node.isCallExpression(node) && node.getExpression().getText() === 'createCustomFocusIndicatorStyle') {
    return processFocusCallExpression(info as TokenResolverInfo<CallExpression>);
  } else if (Node.isCallExpression(node)) {
    return processCallExpression(info as TokenResolverInfo<CallExpression>);
  } else if (Node.isPropertyAssignment(node)) {
    return processPropertyAssignment(info as TokenResolverInfo<PropertyAssignment>);
  }

  return tokens;
};

/**
 * Stub for processing string literals which we don't need currently.
 * @param node
 * @returns
 */
const processStringLiteral = (info: TokenResolverInfo<StringLiteral>): TokenReference[] => {
  return info.tokens;
};

const processIdentifier = (info: TokenResolverInfo<Identifier>): TokenReference[] => {
  const { node, parentName, path, tokens, sourceFile, importedValues } = info;

  let returnTokens = tokens.slice();

  const text = node.getText();
  const intializerNode = getInitializerFromIdentifier(node);
  if (isTokenReference(info)) {
    const propertyName = path[path.length - 1] ?? parentName;
    const importedVal = importedValues.get(text)!;
    // our template groups are already processed and we know they are known tokens so we can just add them
    if (importedVal.templateGroups && importedVal.templateGroups.length > 0) {
      importedVal.templateGroups.forEach((group) => {
        const grouped: TokenReference = { property: propertyName, token: [], path };
        group.forEach((exprNode) => {
          grouped.token.push(exprNode.actualTokenValue ?? exprNode.node.getText());
        });
        if (grouped.token.length > 0) {
          returnTokens.push(grouped);
        }
      });
    } else {
      returnTokens = addTokenToArray(
        {
          property: propertyName,
          token: [importedVal.value],
          path,
        },
        returnTokens,
        sourceFile
      );
    }
    return returnTokens;
  } else if (intializerNode) {
    // we have a variable declaration and we should then check if the value is a token as well. Reprocess the node
    returnTokens = returnTokens.concat(resolveToken({ ...info, node: intializerNode }));
  }

  return returnTokens;
};

const processPropertyAccess = (info: TokenResolverInfo<PropertyAccessExpression>): TokenReference[] => {
  const { node, parentName, path, tokens, sourceFile } = info;

  const text = node.getText();
  const isToken = isTokenReference(info);
  if (isToken) {
    return addTokenToArray(
      {
        property: path[path.length - 1] ?? parentName,
        token: [text],
        path,
      },
      tokens,
      sourceFile
    );
  }
  return tokens;
};

const processObjectLiteral = (info: TokenResolverInfo<ObjectLiteralExpression>): TokenReference[] => {
  const { node, tokens } = info;

  let returnTokens = tokens.slice();
  node.getProperties().forEach((childProp) => {
    returnTokens = returnTokens.concat(
      resolveToken({
        ...info,
        node: childProp,
      })
    );
  });
  return returnTokens;
};

const processSpreadAssignment = (info: TokenResolverInfo<SpreadAssignment>): TokenReference[] => {
  const { node, tokens } = info;
  return tokens.concat(
    resolveToken({
      ...info,
      node: node.getExpression(),
    })
  );
};

const processFocusCallExpression = (info: TokenResolverInfo<CallExpression>): TokenReference[] => {
  const { node, path, parentName, tokens, importedValues } = info;

  const focus = `:focus`;
  const focusWithin = `:focus-within`;
  let nestedModifier = focus;

  const passedTokens = node.getArguments()[0];
  const passedOptions = node.getArguments()[1];

  // Parse out the options being passed to the focus funuction and determine which selector is being used
  if (passedOptions && Node.isObjectLiteralExpression(passedOptions)) {
    passedOptions.getProperties().forEach((property) => {
      if (Node.isPropertyAssignment(property)) {
        const optionName = property.getName();
        if (optionName === 'selector') {
          const selectorType = property.getInitializer()?.getText();
          if (selectorType === 'focus') {
            nestedModifier = focus;
          } else if (selectorType === 'focus-within') {
            nestedModifier = focusWithin;
          }
        }
      }
    });
  }

  if (passedTokens) {
    // We can simplify the logic since we process node types and extract within resolveTokens. We merely need to pass
    // the updated path
    return resolveToken({
      ...info,
      node: passedTokens,
      path: [...path, nestedModifier],
      parentName,
      tokens,
      importedValues,
    });
  }

  return tokens;
};

const processCallExpression = (info: TokenResolverInfo<CallExpression>): TokenReference[] => {
  const { node, path, tokens, importedValues, sourceFile } = info;

  let returnTokens = tokens.slice();
  // Process calls like shorthands.borderColor(tokens.color)
  const functionName = node.getExpression().getText();

  // check if we're using a shorthand function and get the output of a call based on parameters passed into the function
  const affectedProperties = getPropertiesForShorthand(functionName, node.getArguments());

  // If we have a shorthand function, we need to process the affected properties.
  // getPropertiesForShorthand will return an array of objects
  // with the property name and the token reference
  // e.g. { property: 'borderColor', token: 'tokens.color' }
  // It will also deeply check for initialized values etc and validate they are tokens
  if (affectedProperties.length > 0) {
    // Process each argument and apply it to all affected properties
    affectedProperties.forEach((argument) => {
      returnTokens = addTokenToArray(
        {
          property: argument.property,
          token: [argument.token],
          path: path.concat(argument.property),
        },
        returnTokens,
        sourceFile
      );
    });
  } else {
    // Generic handling of functions that are not whitelisted
    node.getArguments().forEach((argument) => {
      returnTokens = returnTokens.concat(
        resolveToken({
          ...info,
          node: argument,
          path: [...path, functionName],
          tokens: returnTokens,
          importedValues,
        })
      );
    });
  }
  return returnTokens;
};

/**
 * This is where we process template spans and feed it back into resolveToken. We also need to check that
 * imported values are tokens etc.
 * We also break down each individual group of fallbacks as multiple tokens in our output. So if a single property
 * like shadow has a few var() functions, we should return each one as a separate token. We should do the same with
 * separate token values in general.
 * @param info
 * @returns
 */
const processTemplateExpression = (info: TokenResolverInfo<TemplateExpression>): TokenReference[] => {
  const { node, path, parentName, tokens } = info;
  const returnTokens = tokens.slice();

  for (const expressions of extractNodesFromTemplateStringLiteral(node).extractedExpressions) {
    // We should create a new token entry if we do indeed have tokens within our literal at this stage
    const groupedTokens: TokenReference = {
      property: path[path.length - 1] ?? parentName,
      token: [],
      path,
    };
    for (const nestedExpression of expressions) {
      const processedToken = resolveToken({
        ...info,
        tokens: [],
        node: nestedExpression,
      });
      if (processedToken.length > 0) {
        for (const token of processedToken) {
          groupedTokens.token.push(...token.token);
        }
      }
    }

    // If we have verified tokens (at least one), push them to the tokens array
    // If this is empty, we only had expressions but no tokens.
    if (groupedTokens.token.length > 0) {
      returnTokens.push(groupedTokens);
    }
  }

  return returnTokens;
};

const processPropertyAssignment = (info: TokenResolverInfo<PropertyAssignment>): TokenReference[] => {
  const { node, path } = info;

  const childName = node.getName();
  const newPath = [...path, childName];
  const propertyNode = node.getInitializer();

  return resolveToken({
    ...info,
    node: propertyNode ?? node,
    path: newPath,
  });
};
