const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemsController')

/* GET home page. */
router.get("/", item_controller.index)
router.get("/items_list/create", item_controller.items_create_get)
router.post("/items_list/create", item_controller.items_create_post)
router.get("/items_list/:id/delete", item_controller.items_delete_get)
router.post("/items_list/:id/delete", item_controller.items_delete_post)
router.get("/items_list/:id/update", item_controller.items_update_get)
router.post("/items_list/:id/update", item_controller.items_update_post)
router.get("/items_list/:id", item_controller.items_detail)
router.get('/items_list', item_controller.items_list);


module.exports = router;