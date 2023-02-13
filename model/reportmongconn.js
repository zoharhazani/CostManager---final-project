// Lior Shlomo - 208011197
// Zohar Hazani - 209189380

const mongoose = require('./costmanager');

// This code defines a Mongoose schema for a "Report" document. The schema includes several fields.
// After the schema is defined, a Mongoose model named "Report" is created using the mongoose model method
// and the schema. This model can be used to perform CRUD operations on "Report" documents in the MongoDB database.
const reportSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    categories: {
        food: [{
            day: Number,
            description: String,
            sum: Number
        }],
        health: [{
            day: Number,
            description: String,
            sum: Number
        }],
        housing: [{
            day: Number,
            description: String,
            sum: Number
        }],
        sport: [{
            day: Number,
            description: String,
            sum: Number
        }],
        education: [{
            day: Number,
            description: String,
            sum: Number
        }],
        transportation: [{
            day: Number,
            description: String,
            sum: Number
        }],
        other: [{
            day: Number,
            description: String,
            sum: Number
        }]
    }
});

const Report = mongoose.model('report', reportSchema);
module.exports = Report;