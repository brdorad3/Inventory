const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemsController')

/* GET home page. */
router.get("/", item_controller.index)
router.get('/items_list', item_controller.items_list);
router.get('/items/tr', function(req, res, next) {
  res.render("sa")
});

module.exports = router;