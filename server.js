const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");
const useragent = require('express-useragent');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const db =  require('./models');
const User = db.user;
const PORT = process.env.PORT || 5000;

dotenv.config()

Sentry.init({
  dsn: "https://8d186034f6c845229352af7b87959938@o578013.ingest.sentry.io/5733973",
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV === "production" ? "production" : "development"
});

// Schedule tasks to be run on the server
// const scheduledEmail = require('./jobs/scheduledListingsEmail')

// Require Routes
const propertiesRouter = require('./routes/properties');
const usersRouter = require('./routes/users');
const userAuthRouter = require('./routes/userAuth');
const agentsRouter = require('./routes/agents');
const agentAuthRouter = require('./routes/agentAuth');
const listingsRouter = require('./routes/listings');
const adminsRouter = require('./routes/admins');
const adminAuthRouter = require('./routes/adminAuth');
const agentsPublicRouter = require('./routes/agentsPublic');
const searchesRouter = require('./routes/searches');

// Middlewares
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(useragent.express());
app.use(cookieParser())
app.use(bodyParser.json());
if(process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'))
}

// Set View Engine
app.set('views', './views')
app.set('view engine', 'ejs')

// Serve static assets
app.use(express.static('public'))

// Use Routes
// app.get('/', async function(req, res) {
//   const token = req.cookies.userJwt;
//   console.log(token)
//   let user;

//   try {
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     req.user = verified;
//     console.log(req.user)
//     user = await User.findByPk(req.user.id)
//     // next() ;
//     console.log(user.toJSON())
//   } catch(err) {
//     console.log(err.message)
//     user = null
//   }
//   // console.log(req.ips)
//   // console.log(req.useragent)
//   res.render('index', {user: user})
// })
app.use("/api/properties", propertiesRouter)
app.use("/users", usersRouter)
app.use("/user-auth", userAuthRouter)
app.use("/agents", agentsRouter)
app.use("/agent-auth", agentAuthRouter)
app.use("/api/listings", listingsRouter)
app.use("/admins", adminsRouter)
app.use("/admin-auth", adminAuthRouter)
app.use("/api/agents", agentsPublicRouter)
app.use("/api/searches", searchesRouter)

// Error Handlers
app.use(Sentry.Handlers.errorHandler());

// Serve static assets
// if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client', 'build')))
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`, process.env.NODE_ENV);
})

