const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers'); 
const routes = require('./controllers'); 
const sessionRoutes = require('./controllers/api/sessionRoutes');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize session store
const sessionStore = new SequelizeStore({
  db: sequelize
});

// Session configuration
const sess = {
  secret: 'your-secret-key', // Change to a secure secret
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  resave: false,
  saveUninitialized: false, // Set to false for compliance with certain laws
  store: sessionStore
};

app.use(session(sess));

// Handlebars setup
const hbs = exphbs.create({
  helpers, 
  partialsDir: path.join(__dirname, 'views/partials') 
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.logged_in = req.session.logged_in || false;
  next();
});

// Routes
app.use('/api', sessionRoutes);
app.use('/', routes);

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});