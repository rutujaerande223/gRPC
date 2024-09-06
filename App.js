// app.js
const PROTO_PATH = './proto/user.proto';
const protoLoader = require('@grpc/proto-loader');
const connectDB = require('./config/db');
const grpc = require('@grpc/grpc-js');
const userController = require('./controller/userController'); // Assuming you have a userController.js with the methods

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// Load the proto package
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

// Create a new gRPC server
const server = new grpc.Server();

// Add the UserService to the server
server.addService(userProto.UserService.service, {
    createUser: userController.createUser,
    getUser: userController.getUser,
    updateUser: userController.updateUser,
    deleteUser:userController.deleteUser,
    getAllUsers:userController.getAllUsers,
});

const PORT = 50052;

// Start the gRPC server
server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        if (error) {
            return console.error(error);
        }
        connectDB();
        console.log(`gRPC server running at http://localhost:${port}`);
    }
);
