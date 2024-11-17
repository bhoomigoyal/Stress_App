const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, phone, password } = req.body;

    try {
        // Normalize email and phone
        const normalizedEmail = email.toLowerCase();
        const normalizedPhone = phone.toString();

        // Check email and phone separately for better error messages
        const emailExists = await User.findOne({ email: normalizedEmail });
        if (emailExists) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        const phoneExists = await User.findOne({ phone: normalizedPhone });
        if (phoneExists) {
            return res.status(400).json({ message: 'Phone number is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            email: normalizedEmail,
            phone: normalizedPhone,
            password: hashedPassword,
        });

        await newUser.save();

        // Log successful creation
        console.log('User created successfully:', {
            email: normalizedEmail,
            phone: normalizedPhone
        });

        res.status(201).json({ 
            message: 'User registered successfully!',
            user: {
                email: normalizedEmail,
                phone: normalizedPhone
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        
        // More specific error handling
        if (error.code === 11000) {  // MongoDB duplicate key error
            return res.status(400).json({ 
                message: 'Database error: Duplicate entry found',
                field: Object.keys(error.keyPattern)[0]
            });
        }
        
        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message 
        });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const normalizedEmail = email.toLowerCase();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ 
            token,
            user: {
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Add a test route to verify API is working
router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes are working!' });
});

module.exports = router;