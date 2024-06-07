import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Missing authorization header' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const data = { userId: decoded.userId };
    return res.status(200).json(data);
}