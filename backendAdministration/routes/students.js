const express = require("express");
const router = express.Router();

const students = require("../data/students");

router.get("/", (req, res) => {
    res.json(students);
});

module.exports = router;