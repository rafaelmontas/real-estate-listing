require('dotenv').config();
module.exports = {
  "development": {
      "username": process.env.RDS_USERNAME || "rafaelmontas",
      "password": process.env.RDS_PASSWORD || null,
      "database": process.env.RDS_DB_NAME || "real_estate_listing",
      "host": process.env.RDS_HOSTNAME || "127.0.0.1",
      "port": process.env.RDS_PORT || 5432,
      "dialect": "postgres"
  }
}