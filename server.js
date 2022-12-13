// A minimal retained mode wrapper with picking support around the Canvas API
const path = require('path');
// web framework for routing endpoints
const express = require('express');

//  express-session is a session cache manager
const session = require('express-session');

// express-handlebars -- the view interface
const exphbs = require('express-handlebars');

// "./routes" - the routes directory 
//      that holds all end-points
const routes = require('./controllers');

// import sequelize connection configuration
const sequelize = require('./config/connection');

// connect Sequelize storage and session storage middleware
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// imports the internal utility helpers modules
const helpers = require('./utils/helpers');

// initializing the express and port number
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Initialize new session storage connection
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// connect the routes(end-points) to the session storage
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// built-in middleware functions 
//  .json() - parses incoming requests w/ JSON payloads
//  .urlencoded() - parses incoming requests w/ URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uses static routes 
// _dirname is the directory where the script is stored
// This is use for the CSS and javascript code
app.use(express.static(path.join(__dirname, 'public')));

// app.use([path], callback, [callback])
// "using" the routes (end-points) directories
app.use(routes);

// Synchronize the models to the DB 
//   Do Not force the creation 
// (Table not DROPped existing table will be deleted)
sequelize.sync({ force: false }).then(() => {
  // express() App listening on the below port
  app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT} `));
});