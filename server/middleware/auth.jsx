const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const auth = req.header('Authorization');
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
