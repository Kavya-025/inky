const jwt = require('jsonwebtoken');

const JWT_SECRET = 'MY_SECRET';

const authenticationMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Authentication token missing'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        const decoded = jwt.verify(token, JWT_SECRET);
        req.email = decoded.email;

        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
};

module.exports = authenticationMiddleware;