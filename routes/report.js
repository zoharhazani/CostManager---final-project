// Lior Shlomo - 208011197
// Zohar Hazani - 209189380

const express = require('express');
const router = express.Router();
const Report = require('../model/reportmongconn');

// This function handles an HTTP GET request to the "/" endpoint and retrieves a report from the database.
// The report is retrieved based on the "user_id", "year", and "month" query parameters passed in the request.
// If an error occurs while retrieving the report, a response with a 500 Internal Server Error status code
// and an error message is returned.
// If the report is not found, a response with a 404 Not Found status code
// and a message indicating that the report was not found is returned.
// If the report is successfully retrieved, a JSON representation of the report's categories
// is sent as the response.
router.get('/', function(req, res, next) {
    Report.findOne({ user_id:req.query.user_id, year: req.query.year, month: req.query.month }, function(err, report) {
        if (err) return res.status(500).json({ message: err });
        if (!report) return res.status(404).json({ message: 'Report not found' });
        res.json(report.categories);
    });
});

module.exports = router;