import React from 'react';

const adminContext = React.createContext({admin: {}}); // Create a context object

export {
  adminContext // Export it so it can be used by other Components
};