const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET
module.exports.authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token

    if (!token) return res.status(401).send('Access Token Required');

    jwt.verify(token,secret, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user; // Attach user info to request object
        next();
    });
}