const jwt = require('jsonwebtoken');

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  console.log(req.header('Authorization'));
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log(token);
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  console.log(jwt.verify(token,'1234'));
   
  try {
    const verified = jwt.verify(token, '1234'); 
    console.log(verified);
    req.user = verified; 
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};


module.exports=authenticateJWT;


