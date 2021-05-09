'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];
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
  onUpdate: 'SET DEFAULT',
  hooks: true
});

// Agents Relations
db.property.belongsTo(db.agent, {foreignKey: 'agent_id'});
db.agent.hasMany(db.property, {
  foreignKey: 'agent_id',
  onDelete: 'SET DEFAULT',
  onUpdate: 'SET DEFAULT',
  hooks: true
});

// Agent Profile Picture Relations
db.AgentProfilePicture.belongsTo(db.agent, {foreignKey: 'agent_id'});
db.agent.hasOne(db.AgentProfilePicture, {
  foreignKey: 'agent_id',
  onDelete: 'SET DEFAULT',
  onUpdate: 'SET DEFAULT',
  hooks: true
});

// Property Pictures Relations
db.PropertyPictures.belongsTo(db.property, {foreignKey: 'property_id'});
db.property.hasMany(db.PropertyPictures, {
  foreignKey: 'property_id',
  onDelete: 'SET DEFAULT',
  onUpdate: 'SET DEFAULT',
  hooks: true
});

// Property Amenities Relations
db.PropertyAmenities.belongsTo(db.property, {foreignKey: 'property_id'});
db.property.hasOne(db.PropertyAmenities, {
  foreignKey: 'property_id',
  onDelete: 'SET DEFAULT',
  onUpdate: 'SET DEFAULT',
  hooks: true
});

// User Likes Relations
db.like.belongsTo(db.user, {foreignKey: 'user_id'});
db.user.hasMany(db.like, {
  foreignKey: 'user_id',
  onDelete: 'SET DEFAULT',
  onUpdate: 'SET DEFAULT'
})

// Listing Likes Relations
db.like.belongsTo(db.property, {foreignKey: 'listing_id'});
db.property.hasMany(db.like, {
  foreignKey: 'listing_id',
  onDelete: 'SET DEFAULT',
  onUpdate: 'SET DEFAULT'
})

db.property.belongsToMany(db.user, {through: db.like, unique: false, foreignKey: 'listing_id'});
db.user.belongsToMany(db.property, {through: db.like, unique: false, foreignKey: 'user_id'});

// Agent Leads
db.AgentLeads.belongsTo(db.agent, {foreignKey: 'agent_id'});
db.agent.hasMany(db.AgentLeads)


module.exports = db;
