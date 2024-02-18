const Items = require('../models/items')

const { query, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async(req, res, next)=>{
res.render("index")

})


exports.items_list = asyncHandler(async(req, res, next)=>{
const allItems = await Items.find({}).sort({name:1}).exec()
res.render("items_list", {items:allItems});
});