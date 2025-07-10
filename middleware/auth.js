const jwt = require('jsonwebtoken');

function auth(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('No token provided');
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role)) return res.status(403).send('No access');
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).send('Invalid token');
    }
  };
}

module.exports = auth;
