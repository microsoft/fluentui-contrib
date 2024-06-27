import React from 'react';
import { Button } from '@fluentui/react-components';

function App() {
  return (
    <>
      <h1>Welcome to Fluent UI V9 Example site</h1>
      <Button
        appearance="primary"
        onClick={() => alert("This doesn't actually do anything yet :)")}
      >
        Get started!
      </Button>
    </>
  );
}

export default App;
