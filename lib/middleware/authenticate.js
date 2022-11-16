const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];
    // checking
    if (!cookie) throw new Error('You must sign in to continue');

    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;
    // payload to req.user
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
