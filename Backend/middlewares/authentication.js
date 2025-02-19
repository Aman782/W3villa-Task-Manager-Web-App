import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

// Middleware to verify JWT
export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ error: 'Unauthorized Access! No token provided.' });

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { algorithms: ['HS256'] });
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const user = await User.findById(decodedToken?._id).select('email username');
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Server Error', message: error.message });
  }
};
