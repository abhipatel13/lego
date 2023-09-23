// controllers/registerController.js
const { ContactModel } = require('../Model/contactus.model');

exports.contactUs = async (req, res) => {
    try {
        const { name,  email, message } = req.body;

        const contactUs = new ContactModel({
            name,
            email,
            message
        });

        await contactUs.save();

        res.status(201).json({ message: 'Contact Form Submitted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
