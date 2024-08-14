const validationMiddleware = (req, res, next) => {
    const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'NODE_ENV'];
    requiredEnvVars.forEach((envVar) => {
      if (!process.env[envVar]) {
        console.error(`Error: Missing environment variable ${envVar}`);
        process.exit(1);
      }
    });
    next();
  };
  
  module.exports = validationMiddleware;
  