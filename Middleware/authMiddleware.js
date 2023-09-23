// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { RegisterModel } = require('../Model/register.model'); // Assuming your user model is named "Register"

module.exports = async (req, res, next) => {
  try {
    // Get the JWT token from the request headers
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided.' });
    }

    // Verify the token using your secret key
    const decoded = jwt.verify(token, "12121saas");

    // Find the user by ID from the token payload
    const user = await RegisterModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }

    // Attach the user object to the request for use in subsequent middleware or routes
    req.user = user;

    // Continue to the next middleware or route
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
};
