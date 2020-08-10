const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Database
const db =  require('./models');

// Require Routes
const propertiesRouter = require('./routes/properties');
const usersRouter = require('./routes/users');
const agentsRouter = require('./routes/agents');


// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));

// Use Routes
app.use("/properties", propertiesRouter)
app.use("/users", usersRouter)
app.use("/agents", agentsRouter)


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  })
})
