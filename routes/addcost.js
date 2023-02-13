// Lior Shlomo - 208011197
// Zohar Hazani - 209189380

// addcost.js - This file creates an Express router that implements a POST endpoint for adding new costs.
// The cost data is stored in a MongoDB database using the Mongoose model defined in this file.
const express = require('express');
const router = express.Router();
const mongoose = require('../model/costmanager');
const Report = require('../model/reportmongconn');
const User = require('../model/usermongconn');
const Cost = require('../model/costmongconn');

// A function that defines the id of the new cost we created, we decided to do it simply -
// as consecutive numbers, and therefore we used the cost.count function which will sum up
// how many costs we already have in the collection.
// This is an asynchronous function that returns a promise object
async function generateID() {
    return new Promise((resolve, reject) => {
        Cost.count({}, function(err, count) {
            if (err) {
                reject(err);
            } else {
                resolve(count + 1);
            }
        });
    });
}

// A function that checks if the user_id already exist in the users collection
// according to the user_id received by the request.
// This is an asynchronous function that returns a promise object
async function checkUserIdExists(userId) {
    const user = await User.findOne({ id: userId });
    if (user == null) {
        throw new Error('User with provided user_id does not exist');
    }
    return true;
}
// A function that checks the validation of the category (does it exist in the array - categoryArr)
function generateCategory(category,categoryArr) {
    if (!categoryArr.includes(category)) {
        throw new Error('Category is not valid');
    }
    return true;
}

// Day, month, and year validation functions.
function validateDay(currDay){
    if (currDay > 31) {
        throw new Error(`Provided day is invalid: ${currDay} is bigger than 31`);
    }
    if (currDay < 1) {
        throw new Error(`Provided day is invalid: ${currDay} is smaller than 1`);
    }
}

function validateMonth(currMonth){
    if (currMonth > 12) {
        throw new Error(`Provided Month is invalid: ${currMonth} is bigger than 12`);
    }
    if (currMonth < 1) {
        throw new Error(`Provided Month is invalid: ${currMonth} is smaller than 1`);
    }
}

function validateYear(currYear){

    if (currYear > new Date().getFullYear().toString()) {
        throw new Error(`Provided year is invalid: ${currYear} is bigger than the current year`);
    }
    if (currYear < 1) {
        throw new Error(`Provided year is invalid: ${currYear} is smaller than 1`);
    }
}

// This function handles an HTTP POST request to the "/" endpoint and adds a new cost to the database.
// It first validates the day, month, and year from the request body, checks if the user ID exists, if the
// provided category is valid and generates a unique ID for the new cost.
// The new cost information is then added to the costs collection and to the user's report by updating the
// report's categories field.
// The idea of the reports collection is to implement the design pattern Computed, by reducing the cpu workload.
// instead of going on every cost that exist in the collection costs and checking all over them a specific user_id,
// month and year
// every time the user ask for a report, we decided to build a report collection that includes the user id ,
// month year and the possible categories. We assume that if the user inserts a cost in a particular month,
// he will finally request a report for that month. It makes the queries faster and simpler.
// Finally, the updated report is saved to the database and a response indicating the success of the operation or not.
router.post('/', async (req, res) => {
    try {
        let currDay, currMonth,currYear;
        const date = new Date();

        if(!req.body.day){currDay = date.getDate(); }
        else
        {
            validateDay(req.body.day);
            currDay = req.body.day ;
        }
        if(!req.body.month){currMonth = date.getMonth() + 1; }
        else
        {
            validateMonth(req.body.month);
            currMonth = req.body.month ;
        }
        if(!req.body.year){currYear = date.getFullYear(); }
        else
        {
            validateYear(req.body.year);
            currYear = req.body.year ;
        }

        await checkUserIdExists(req.body.user_id);

        // An array that holds the possible categories when a certain cost is added.
        const categoryArr = ['food', 'health', 'housing', 'sport', 'education', 'transportation','other'];
        generateCategory(req.body.category,categoryArr);

        // After the validation functions, we call the function that generate the cost id.
        const currId = await generateID();

        // Create new cost based on the user's input by the Cost Ctor func.
        const newCost = new Cost({
            user_id: req.body.user_id,
            year:currYear,
            month:currMonth,
            day: currDay,
            id: currId,
            description: req.body.description,
            category: req.body.category,
            sum: req.body.sum
        });

        // Saving the new cost as a new document in the costs collection in our CostManager DB.
        await newCost.save();

        // Checking if there is a report that has the details of the same month and year as the cost has.
        // If exists -> add(push) it to the same repost.
        // If doesn't exist -> build new report with the user_id ,month and year details and add it to the right category
        let report = await Report.findOne({user_id: req.body.user_id, year: currYear, month: currMonth});

        if (!report) {
            report = new Report({user_id: req.body.user_id, year: currYear, month: currMonth, categories: {}});
        }

        const category = req.body.category;
        if (!report.categories) {
            report.categories = {};
        }
        if (!report.categories[category]) {
            report.categories[category] = [];
        }
        report.categories[category].push({day: currDay, description: req.body.description, sum: req.body.sum});

        // Saving the new report
        await report.save();

        // Retrieve to the user the status of his request:
        // In case of success: 'Cost added successfully'
        // In case of failure: return the right error
        res.json({message: 'Cost added successfully'});
    } catch (error) {

        res.status(400).json({ error: error.message });
    }
});

module.exports = router;


