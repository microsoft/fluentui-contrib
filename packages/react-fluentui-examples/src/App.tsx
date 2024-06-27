import React from 'react';
import { Button } from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to Fluent UI V9 Example site</h1>
      <Button appearance="primary" onClick={() => navigate('/list')}>
        Go to List!
      </Button>
    </>
  );
}

export default App;
