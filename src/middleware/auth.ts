import * as jwt from 'jsonwebtoken';

// Middleware
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      auth: false,
      message: 'No token'
    });
  }

  jwt.verify(
    token.replace('Bearer ', ''),
    process.env.SECRET,
    function (err, decoded) {
      if (err) {
        return res.status(401).json({
          auth: false,
          message: 'This is not good, an error occurred'
        });
      }

      req.user = decoded.user;
      next();
    });
}

export default auth;