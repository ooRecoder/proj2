require('dotenv').config();
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ex: { id: 123 }
        next();
    } catch {
        return res.sendStatus(403);
    }
}

module.exports = authMiddleware