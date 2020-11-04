const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;

dotenv.config()

// Database
const db =  require('./models');

// Require Routes
const propertiesRouter = require('./routes/properties');
const usersRouter = require('./routes/users');
const userAuthRouter = require('./routes/userAuth');
const agentsRouter = require('./routes/agents');


// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));

// Use Routes
app.use("/properties", propertiesRouter)
app.use("/users", usersRouter)
app.use("/user-auth", userAuthRouter)
app.use("/agents", agentsRouter)

// Serve static assets
// if(process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  // })
// }


// {force: true}
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`, process.env.NODE_ENV);
  })
})