const express = require('express');
const router = express.Router();

const sauceController = require("../controllers/sauce")

router.get('/', sauceController.getAllSauce);
router.post('/', sauceController.createSauce);
router.get('/:id', sauceController.getOneSauce);
router.put('/:id', sauceController.modifySauce);
router.delete('/:id', sauceController.deleteSauce);

module.exports = router;