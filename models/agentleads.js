'use strict';
module.exports = (sequelize, DataTypes) => {
  const AgentLeads = sequelize.define('AgentLeads', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: DataTypes.UUID,
    listing_id: DataTypes.UUID,
    agent_id: DataTypes.UUID,
    initial_request: DataTypes.TEXT
  }, {
    tableName: 'agent_leads',
    indexes: [{fields: ['listing_id', 'user_id', 'agent_id']}]
  });
  AgentLeads.associate = function(models) {
    // associations can be defined here
  };
  return AgentLeads;
};