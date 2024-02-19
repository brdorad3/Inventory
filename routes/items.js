const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemsController')

/* GET home page. */
router.get("/", item_controller.index)
router.get("/items_list/create", item_controller.items_create_get)
router.post("/items_list/create", item_controller.items_create_post)
router.get('/items_list', item_controller.items_list);

router.get("/items_list/:id", item_controller.items_detail)
module.exports = router;