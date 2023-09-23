// controllers/registerController.js
const { RegisterModel } = require('../Model/register.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

exports.registerUser = async (req, res) => {
    try {
        const { name, dateofbirth, username, email, password } = req.body;

        // Check if the username or email already exists
        const existingUser = await RegisterModel.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new RegisterModel({
            name,
            dateofbirth,
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Create a JWT token for the newly registered user
        const token = jwt.sign({ userId: user._id, email: user.email }, '12121saas'); // Replace with your actual JWT secret key

        res.status(201).json({ message: 'User registered successfully', token, id: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID in the database
        const user = await RegisterModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return user details without the password
        const userDetails = {
            name: user.name,
            dateofbirth: user.dateofbirth,
            username: user.username,
            email: user.email,
        };

        res.status(200).json(userDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, dateofbirth, username } = req.body;

        // Find the user by ID in the database
        const user = await RegisterModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update only the specified fields
        user.name = name;
        user.dateofbirth = dateofbirth;
        user.username = username;

        await user.save();

        res.status(200).json({ message: 'User details (name, username, dateofbirth) updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
