import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1d' }
  );
}

export function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: "Token required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ error: "Invalid token" });
    }
}


export function authorizeRoles(req, res, next) {
    const user = req.user;
    if (user.role != 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
}
