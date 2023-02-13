// Lior Shlomo - 208011197
// Zohar Hazani - 209189380

// This code imports the express library and creates an instance of an express router,
// and then imports the mongoose module for the costManager model.
const express = require('express');
const router = express.Router();
const mongoose = require('../model/costmanager');
const User = require('../model/usermongconn');

// This function handles an HTTP POST request to the "/" endpoint and creates a new user in the database.
// It creates a new user object from the request data, which contains the user's ID, first name, last name,
// and birthday.
// If there is an error while saving the user to the database,
// a response with a 400 Bad Request status code and an error message is returned.
router.post('/', (req, res) => {
    // Create a new user object from the request data
        const user = new User({
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name ,
        birthday: req.body.birthday
    })
        // Save the cost to the database
        user.save()
            .then(user => res.json(user))
            .catch(error => res.status(400).json({ error: 'error' }));
});
module.exports = router;


