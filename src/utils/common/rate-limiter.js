const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests from this IP, please try again after 1 minute",
            error: {
                statusCode: 429,
                explanation: "Rate limit exceeded"
            },
            data: {},
        });
    },
});

module.exports = limiter;