// Lior Shlomo - 208011197
// Zohar Hazani - 209189380

const mongoose = require('./costmanager');

// This code defines a Mongoose schema for a "User" object.
// The schema contains four properties: id, first_name, last_name, and birthday.
// All four properties are required and their data type is specified.
// The User object is then modeled using the mongoose.model() method and the userSchema as the template.
// This will allow us to perform CRUD operations on user data stored in a MongoDB database using the Mongoose API.
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    }
});
const User = mongoose.model('user', userSchema);
module.exports = User;

