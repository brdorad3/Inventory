const express = require('express');
const router = express.Router();

const item_controller = require('../controllers/itemsController');
const cat_controller = require('../controllers/categoryController')

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
router.get("/mm", item_controller.items_m)


router.get("/cat_list/create", cat_controller.cat_create_get);
router.post("/cat_list/create", cat_controller.cat_create_post);
router.get("/cat_list/:id/delete", cat_controller.cat_delete_get)
router.post("/cat_list/:id/delete", cat_controller.cat_delete_post)
router.get("/cat_list/:id/update", cat_controller.cat_update_get)
router.post("/cat_list/:id/update", cat_controller.cat_update_post)
router.get("/cat_list/:id", cat_controller.cat_detail);
router.get("/cat_list", cat_controller.cat_list);

module.exports = router;