// web framework for routing endpoints
const express = require('express');

//  express-session is a session cache manager
const session = require('express-session');

// "./routes" - the routes directory 
//      that holds all end-points
const routes = require('./controllers');

// import sequelize connection configuration
const sequelize = require('./config/connection');

// connect Sequelize storage and session storage middleware
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// initializing the express and port number
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize new session storage connection
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// connect the routes(end-points) to the session storage
app.use(session(sess));
// built-in middleware functions 
//  .json() - parses incoming requests w/ JSON payloads
//  .urlencoded() - parses incoming requests w/ URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use([path], callback, [callback])
// "using" the routes (end-points) directories
app.use(routes);

// Synchronize the models to the DB 
//   Do Not force the creation 
// (Table not DROPped existing table will be deleted)
sequelize.sync({ force: false }).then(() => {
  // express() App listening on the below port
  app.listen(PORT, () => console.log(`Now listening on ${PORT} `));
});