// Lior Shlomo - 208011197
// Zohar Hazani - 209189380

// Import the Mongoose library
const mongoose = require('mongoose');

// Connection string for a MongoDB database hosted on MongoDB Atlas
const uri = 'mongodb+srv://zohar:Zohar1234!@cluster0.prxuli3.mongodb.net/CostManager?retryWrites=true&w=majority';

// Connect to the database using the Mongoose library and the connection string
mongoose.connect(uri, {
    // Use the new URL parser
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .catch(error => console.error(error));

// Export the Mongoose library as a module
module.exports = mongoose;