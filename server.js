const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// Require Routes
const propertiesRouter = require('./routes/properties');


// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));

// Use Routes
app.use("/properties", propertiesRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})