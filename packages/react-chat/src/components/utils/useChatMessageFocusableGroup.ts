import { useFocusableGroup } from '@fluentui/react-components';
import { ChatMessageState } from '../ChatMessage/ChatMessage.types';
import { ChatMyMessageState } from '../ChatMyMessage/ChatMyMessage.types';

export const useChatMessageFocusableGroup = (
  state: Pick<ChatMessageState | ChatMyMessageState, 'body'>
) => {
  const groupperAttributes = useFocusableGroup({
    tabBehavior: 'limited-trap-focus',
  });

  // TODO: type cast here due to state.body not supporting data-xxx type.
  // Need typescript 4.4+ (Feature 2759283) and fluent Slot typing update (https://github.com/microsoft/fluentui/issues/23033)
  const consumerTabsterAttributesValue = (state.body as Record<string, string>)[
    TabsterTypes.TabsterAttributeName
  ];

  // merge default Tabster attributes with consumer's Tabster attributes
  const finalTabsterAttributes = useMergedTabsterAttributes(
    groupperAttributes,
    consumerTabsterAttributesValue
      ? { [TabsterTypes.TabsterAttributeName]: consumerTabsterAttributesValue }
      : undefined
  );

  (state.body as Record<string, string | undefined>)[
    TabsterTypes.TabsterAttributeName
  ] = finalTabsterAttributes[TabsterTypes.TabsterAttributeName];
};

/**
 * Merge two tabster attributes (object of type {"data-tabster": string}) and return the result.
 */
const useMergedTabsterAttributes: (
  attributeOne: TabsterTypes.TabsterDOMAttribute,
  attributeTwo?: TabsterTypes.TabsterDOMAttribute
) => TabsterTypes.TabsterDOMAttribute = (attributeOne, attributeTwo) => {
  const attributeOneValueString =
    attributeOne[TabsterTypes.TabsterAttributeName];
  const attributeTwoValueString =
    attributeTwo?.[TabsterTypes.TabsterAttributeName];

  return React.useMemo(() => {
    let attributeOneValue = {};
    let attributeTwoValue = {};
    if (attributeOneValueString) {
      try {
        attributeOneValue = JSON.parse(attributeOneValueString);
      } catch (e) {
        attributeOneValue = {};
      }
    }
    if (attributeTwoValueString) {
      try {
        attributeTwoValue = JSON.parse(attributeTwoValueString);
      } catch (e) {
        attributeTwoValue = {};
      }
    }
    return {
      [TabsterTypes.TabsterAttributeName]: attributeTwoValueString
        ? JSON.stringify({
            ...attributeOneValue,
            ...attributeTwoValue,
          })
        : attributeOneValueString,
    };
  }, [attributeOneValueString, attributeTwoValueString]);
};
