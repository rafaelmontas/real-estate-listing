const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const db =  require('./models'); // Import Database

dotenv.config()

// Require Routes
const propertiesRouter = require('./routes/properties');
const usersRouter = require('./routes/users');
const userAuthRouter = require('./routes/userAuth');
const agentsRouter = require('./routes/agents');

// Middlewares
app.use(bodyParser.json());
if(process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'))
}

// Use Routes
app.use("/api/properties", propertiesRouter)
app.use("/users", usersRouter)
app.use("/user-auth", userAuthRouter)
app.use("/agents", agentsRouter)

// Serve static assets
if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`, process.env.NODE_ENV);
})


// {force: true}
// db.agent.drop()
// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`, process.env.NODE_ENV);
//   })
// })