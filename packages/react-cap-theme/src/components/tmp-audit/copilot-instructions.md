# Invocation Contract (Strict)

Imagine you are going to help designers understand deltas between Fluent UI v9 and SharePoint Design System (SPDS) React components by generating component audit files. Please generate the audit in a designer-friendly language with the things designers can understand and follow the instructions below precisely.

## User Input Contract

The user will provide ONLY a single component name as the prompt (for example: Badge, Avatar, Pill, TeachingBubble).

When the prompt consists of only a component name, Copilot MUST interpret it as the following full instruction (implicitly):

> Using the component audit template defined in [component-template.md](component-template.md) and the formatting rules in [copilot-instructions.md](copilot-instructions.md), populate the sections for the specified component. Ensure the output is compatible for direct paste into a Microsoft Loop document. Preserve all headings, wording, and section order exactly.

### Copilot Must Not:

- Ask clarifying questions
- Request confirmation
- Rephrase the task
- Add commentary outside the template
- Use training data for information

---

## MCP Server Rule (Mandatory)

Copilot MUST ALWAYS reference and reason using the **fluent-agent** MCP server when working on component audits.

### Required Information Gathering Workflow

Before creating any component audit file, Copilot MUST execute ALL of the following queries:

1. **Query fluent-agent with knowledge_base="react-v9"**: Get Fluent UI v9 implementation details (props, variants, DOM structure, tokens, sizes)

   - FluentUI react component URL (format: https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-{component-name-lowercase})

2. **Query fluent-agent with knowledge_base="spds"**: Get SharePoint-specific implementation details including:

   - Whether component exists in SharePoint React library
   - SharePoint Storybook URL (format: https://odsp-int.azurewebsites.net/sharepoint-storybook/?path=/docs/...)
   - Package name (@msinternal/sharepoint-ui-react or dedicated package)
   - Any SharePoint-specific props or API differences
   - Any SharePoint-specific appearance variants or enhancements

3. **Semantic search workspace**: Check for any existing implementation details or notes

4. **SPDS Figma spec lookup**: Find the figma spec in the project https://www.figma.com/files/588096576863690753/project/271197190?fuid=1560388046511902778

5. **SPDS Storybook lookup**: Find the exact story for each component here https://odsp-int.azurewebsites.net/sharepoint-storybook/?path=/docs/welcome-introduction--docs

### Information Availability Rules

- Use `[UNABLE TO GATHER INFORMATION]` ONLY for information that genuinely does not exist (e.g., Figma spec links not in documentation)
- If a component exists in SPDS Storybook, the Storybook URL MUST be populated
- If a component exists in SharePoint React, the package name MUST be populated
- DOM/VDOM and interface changes MUST be answered as Yes/No based on retrieved data

### If Information is Missing

If information cannot be retrieved after executing all required queries, Copilot must:

- Document what was searched and what was not found
- Leave the field as `[UNABLE TO GATHER INFORMATION]`
- Continue generating the file without blocking

**Note:** Copilot must not use alternative MCP servers for this workflow.

---

## File Creation Rule (Mandatory)

For every component audit:

- Create exactly one Markdown file
- File name must match the component name exactly, with `.md` extension

### Examples

- `Badge.md`
- `Avatar.md`
- `CommandbarButton.md`

**Important:** The response output must contain only the contents of this file (no preambles, no explanations, no summaries).

---

## Output Formatting Rules (Microsoft Loop Compatible)

All output must be safe to copy directly from VS Code and paste into a Microsoft Loop document without edits.

### Copilot MUST:

- Use bold text (`**text**`) for section headings (NOT `##` or `#`)
- Preserve blank lines between sections
- Use bold labels followed by line breaks for field names
- Use flat bullet lists with no indentation
- Avoid tables, code blocks, or HTML
- Place links on their own line
- Use `[UNABLE TO GATHER INFORMATION]` exactly where information is missing
- Use horizontal rules (`---`) to separate major sections

### Copilot MUST NOT:

- Use `##` or `#` Markdown heading syntax (these don't render in Loop)
- Use nested bullet lists
- Use code fences or inline code blocks
- Use HTML elements

---

## Component Audit Template

(All headings and wording below must be preserved exactly)
