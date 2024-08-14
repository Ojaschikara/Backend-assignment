const winston = require('winston');
require('winston-mongodb');

// Check if MONGO_URI is being read correctly
console.log('MongoDB URI:', process.env.MONGO_URI);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.MongoDB({
            db: process.env.MONGO_URI,  // This should be your MongoDB connection string
            collection: 'logs',
            level: 'error',
            options: { useUnifiedTopology: true }
        })
    ]
});

module.exports = logger;
