const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 1, // Limit each IP to 1 request per windowMs
  message: "Too many requests from this IP, please try again after 3 minutes",
});

module.exports = limiter;
