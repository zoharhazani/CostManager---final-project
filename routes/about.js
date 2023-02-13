// Lior Shlomo - 208011197
// Zohar Hazani - 209189380

const express = require('express');
const router = express.Router();

// This function handles an HTTP GET request to the "/" endpoint and returns a JSON array of Project presenters.
// The objects contain the first name, last name, ID, and email of two presenters.
router.get('/', function(req, res, next) {
  res.json([{'firstname':'Zohar','lastname':'Hazani','id':209189380,'email':'zohar78hazani@gmail.com'},
    {'firstname':'Lior','lastname':'Shlomo','id':208011197,'email':'liorsh5656@gmail.com'}]);
});

module.exports = router;
