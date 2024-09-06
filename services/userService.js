const User = require('../models/userModel');

// Create new customer
exports.createUser = async (data) => {
    const user = new User(data);
    return await user.save();
};

// Get customer by ID
exports.getUserById = async (id) => {
    return await User.findById(id);
};

// Get all customers
exports.getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

exports.updateUser = async (id, updates) => {
    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        return user;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

exports.deleteUser = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        return user;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};