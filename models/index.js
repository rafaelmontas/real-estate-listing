'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Users Relations
db.property.belongsTo(db.user, {foreignKey: 'user_id'});
db.user.hasMany(db.property, {
  foreignKey: 'user_id',
  onDelete: 'SET DEFAULT',
  onUpdate: 'SET DEFAULT'
});

// Agents Relations
db.property.belongsTo(db.agent, {foreignKey: 'agent_id'});
db.agent.hasMany(db.property, {
  foreignKey: 'agent_id',
  onDelete: 'SET DEFAULT',
  onUpdate: 'SET DEFAULT'
});

// Agent Profile Picture Relations
db.AgentProfilePicture.belongsTo(db.agent, {foreignKey: 'agent_id'});
db.agent.hasOne(db.AgentProfilePicture, {
  foreignKey: 'agent_id',
  onDelete: 'SET DEFAULT',
  onUpdate: 'SET DEFAULT'
});

// Property Pictures Relations
db.PropertyPictures.belongsTo(db.property, {foreignKey: 'property_id'});
db.property.hasMany(db.PropertyPictures, {
  foreignKey: 'property_id',
  onDelete: 'SET DEFAULT',
  onUpdate: 'SET DEFAULT'
});

module.exports = db;
