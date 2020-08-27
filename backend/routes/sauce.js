const express = require('express');
const router = express.Router();
const sauceController = require("../controllers/sauce")

// model
const Sauce = require('../models/Sauce');

// routes

router.get('/', sauceController.getAllSauce);
router.post('/', sauceController.createSauce);
router.get('/:id', sauceController.getOneSauce);
router.put('/:id', sauceController.modifySauce);
router.delete('/:id', sauceController.deleteSauce);

module.exports = router;