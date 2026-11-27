# @fluentui-contrib/react-chat

Chat component powered by Fluent UI and used in Microsoft Teams.

## Try it out

```sh
yarn add @fluentui-contrib/react-chat

npm install @fluentui-contrib/react-chat
```

```tsx
import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import { Chat, ChatMessage, ChatMyMessage } from '@fluentui-contrib/react-chat';

export const SampleChat = () => {
  return (
    <Chat>
      <ChatMessage avatar={<Avatar name="Ashley McCarthy" badge={{ status: 'available' }} />}>Hello I am Ashley</ChatMessage>
      <ChatMyMessage>Nice to meet you!</ChatMyMessage>
    </Chat>
  );
};
```

## Customizing chat width

The chat uses a default maximum width of `1056px`. You can override it with
`--fui-chat-max-width` without replacing the component's styles:

```tsx
<Chat style={{ '--fui-chat-max-width': '100%' } as React.CSSProperties}>
  {/* Chat messages */}
</Chat>
```

The default width remains unchanged when the custom property is not set.
