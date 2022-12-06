const withAuth = (req, res, next) => {
  // TODO: Add a comment describing the functionality of this if statement
  //  created middleware
  //  authenticates (validates) log in information on the route active session
  // if not logged in redirects to login page
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
