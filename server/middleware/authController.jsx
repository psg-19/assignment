const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models.jsx');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: 'User exists' });
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  user = new User({ email, passwordHash });
  await user.save();
  const payload = { user: { id: user.id }};
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid creds' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(400).json({ message: 'Invalid creds' });
  const payload = { user: { id: user.id }};
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};  