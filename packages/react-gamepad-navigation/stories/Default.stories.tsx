import * as React from 'react';

export const Default = () => (
  <div
    style={{
      border: '3px dotted orange',
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <div style={{ border: '3px dotted grey', padding: 10, paddingTop: 0 }}>
      <h1>Light DOM</h1>
    </div>

    <div style={{ border: '3px dotted grey', padding: 10, paddingTop: 0 }}>
      <h1>Shadow DOM</h1>
    </div>
  </div>
);
