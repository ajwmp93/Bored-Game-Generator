module.exports = (req, res, next) => {
  if (req.session && req.session.user_id) {
    // User is logged in
    return next();
  } else {
    // User is not logged in
    res.redirect('/login'); // Redirect to login page or send a response indicating unauthenticated
  }
};