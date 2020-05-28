const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Person = mongoose.model('Person');

router.get('/', (req, res) => {
    res.render("persons/add", {
        viewTitle: "Add New Record"
    });
});




module.exports = router;
