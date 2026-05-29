const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); 
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    
    if (!req.body.password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    
    const user = await User.create({ ...req.body, password: hashedPassword });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    
    if (req.body.password) {
      
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account is inactive. Please contact support.' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, role: user.role, firstName: user.firstName }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const registerUser = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      age, 
      gender, 
      contactNumber, 
      username, 
      address 
    } = req.body;

    
    if (!firstName || !email || !password || !username) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    
    const userExists = await User.findOne({ 
      $or: [
        { email: { $regex: new RegExp(`^${email}$`, 'i') } },
        { username: { $regex: new RegExp(`^${username}$`, 'i') } }
      ]
    });

    if (userExists) {
      return res.status(400).json({ message: 'User or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      gender,
      contactNumber,
      username,
      address,
      role: 'viewer', 
      isActive: true
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      role: user.role,
      firstName: user.firstName
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { 
  getUsers, 
  createUser, 
  updateUser, 
  deleteUser, 
  loginUser, 
  registerUser 
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser, registerUser };