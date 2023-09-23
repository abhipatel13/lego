const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { RegisterModel } = require('../Model/register.model');

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await RegisterModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Create a JSON Web Token (JWT)
    const token = jwt.sign({ userId: user._id }, '12121saas', {
      expiresIn: '1h',
    });

    res.status(200).json({ token, id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};