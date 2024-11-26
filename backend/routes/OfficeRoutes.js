const express = require('express');
const Office = require('../models/Offices');

const router = express.Router();

router.post("/", async (req, res) => {
    const office = await Office.create(req.body);
    res.status(201).json(office);
});

module.exports = router;