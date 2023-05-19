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
