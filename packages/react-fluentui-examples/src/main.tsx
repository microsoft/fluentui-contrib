import React from 'react';
import ReactDOM from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import List from './examples/List/';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/list',
    element: <List />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <RouterProvider router={router} />
    </FluentProvider>
  </React.StrictMode>
);
