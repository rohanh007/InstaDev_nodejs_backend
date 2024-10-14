const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, 'secret_key'); 
    req.user = verified; 
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateJWT;
