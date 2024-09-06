// controllers/userController.js
const userService = require('../services/userService'); // Correct path
const grpc = require('@grpc/grpc-js');

// Handle CreateUser gRPC request
exports.createUser = async (call, callback) => {
    try {
        const { name, email } = call.request;
        const user = await userService.createUser({ name, email });
        callback(null, { message: 'User created successfully', success: true });
    } catch (error) {
        callback({ code: grpc.status.INTERNAL, message: error.message });
    }
};

// Handle GetUser gRPC request
exports.getUser = async (call, callback) => {
    try {
        const { id } = call.request;
        const user = await userService.getUserById(id);
        if (!user) {
            return callback({ code: grpc.status.NOT_FOUND, message: 'User not found' });
        }
        callback(null, { id: user._id.toString(), name: user.name, email: user.email, success: true });
    } catch (error) {
        callback({ code: grpc.status.INTERNAL, message: error.message });
    }
};

// Handle UpdateUser gRPC request
exports.updateUser = async (call, callback) => {
    try {
        const { id, name, email } = call.request;
        // Call the update method from userService
        const updatedUser = await userService.updateUser(id, { name, email });
        if (!updatedUser) {
            return callback({ code: grpc.status.NOT_FOUND, message: 'User not found' });
        }
        callback(null, { message: 'User updated successfully', success: true });
    } catch (error) {
        callback({ code: grpc.status.INTERNAL, message: error.message });
    }
};

exports.deleteUser = async (call, callback) => {
    try {
        const { id } = call.request;
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            return callback({ code: grpc.status.NOT_FOUND, message: 'User not found' });
        }
        callback(null, { message: 'User deleted successfully', success: true });
    } catch (error) {
        callback({ code: grpc.status.INTERNAL, message: error.message });
    }
};

exports.getAllUsers = async (call, callback) => {
    try {
        const users = await userService.getAllUsers();
        const userList = users.map(user => ({
            id: user._id.toString(),
            name: user.name,
            email: user.email
        }));
        callback(null, { users: userList, success: true });
    } catch (error) {
        callback({ code: grpc.status.INTERNAL, message: error.message });
    }
};