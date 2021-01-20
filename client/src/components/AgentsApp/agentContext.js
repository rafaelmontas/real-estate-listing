import React from 'react';

const agentContext = React.createContext({agent: {}}); // Create a context object

export {
  agentContext // Export it so it can be used by other Components
};