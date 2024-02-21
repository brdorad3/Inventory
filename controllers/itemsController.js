const Items = require('../models/items')
const Category = require('../models/category')

const { body, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async(req, res, next)=>{
res.render("index")
});

exports.items_list = asyncHandler(async(req, res, next)=>{
const allItems = await Items.find({}).sort({name:-1}).exec()
res.render("items_list", {items:allItems});
});

exports.items_detail = asyncHandler(async (req, res, next) => {
    try {
      const item = await Items.findById(req.params.id).populate('genre').exec();
      if (!item) {
        // Handle case where item is not found
        return res.status(404).send('Item not found');
      }
      res.render("items_detail", { items: item });
    } catch (err) {
      return next(err);
    }
  });
  

exports.items_create_get = asyncHandler(async(req,res,next)=>{
        try {
          const [items, allCategories] = await Promise.all([
           await Items.find().sort({name:1}).exec(),
           await Category.find().sort({name:1}).exec()
          ])
          res.render("items_create", { items: items, categories: allCategories });
        } catch (err) {
          return next(err);
        }
});

exports.items_create_post = [
    (req, res, next) => {
        if (!Array.isArray(req.body.genre)) {
          req.body.genre =
            typeof req.body.genre === "undefined" ? [] : [req.body.genre];
        }
        next();
      },
      body("name", "title must not be empty").trim().isLength({min:1}).escape(),
      body("desc", "desc must not be empty").trim().isLength({min:1}).escape(),
      body("price", "price must not be empty").trim().isLength({min:1}).escape(),
      body("stock", "stock must not be empty").trim().isLength({min:1}).escape(),
      body("genre.*").escape(),

      asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
    const item = new Items({
        name:req.body.name,
        desc:req.body.desc,
        price: req.body.price,
        stock: req.body.stock,
        genre: req.body.genre
    });
    if (!errors.isEmpty()) {
        const [allItems, allCategories] = await Promise.all([
          Items.find().sort({ name: 1 }).exec(),
          Category.find().sort({ name: 1 }).exec(),
        ]);
  
        for (const genre of allCategories) {
          if (item.genre.indexOf(genre._id) > -1) {
            genre.checked = "true";
          }
        }
        res.render("items_create", {
          title: "Create Items",
          items: allItems,
          categories: allCategories,
          item: item,
          errors: errors.array(),
        });
      } else {
        await item.save();
        res.redirect(item.url);
      }
    }),     
];

exports.items_delete_get = asyncHandler(async(req, res, next)=>{
  res.render("items_delete");
});
exports.items_delete_post = asyncHandler(async(req, res, next)=>{
await Items.findByIdAndDelete(req.params.id).exec();
res.redirect("/items/items_list");
});

exports.items_update_get = asyncHandler(async(req, res, next)=>{
  try {
    const [items, allCategories] = await Promise.all([
     await Items.find().sort({name:1}).exec(),
     await Category.find().sort({name:1}).exec()
    ])
    res.render("items_create", { title:"Update item", items: items, categories: allCategories });
  } catch (err) {
    return next(err);
  }
});
exports.items_update_post = [
  (req, res, next) => {
      if (!Array.isArray(req.body.genre)) {
        req.body.genre =
          typeof req.body.genre === "undefined" ? [] : [req.body.genre];
      }
      next();
    },
    body("name", "title must not be empty").trim().isLength({min:1}).escape(),
    body("desc", "desc must not be empty").trim().isLength({min:1}).escape(),
    body("price", "price must not be empty").trim().isLength({min:1}).escape(),
    body("stock", "stock must not be empty").trim().isLength({min:1}).escape(),
    body("genre.*").escape(),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
  const item = new Items({
      name:req.body.name,
      desc:req.body.desc,
      price: req.body.price,
      stock: req.body.stock,
      genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
      _id: req.params.id,
  });
  if (!errors.isEmpty()) {
      const [allItems, allCategories] = await Promise.all([
        Items.find().sort({ name: 1 }).exec(),
        Category.find().sort({ name: 1 }).exec(),
      ]);

      for (const genre of allCategories) {
        if (item.genre.indexOf(genre._id) > -1) {
          genre.checked = "true";
        }
      }
      res.render("items_create", {
        title: "Update Items",
        items: allItems,
        categories: allCategories,
        item: item,
        errors: errors.array(),
      });
    } else {
      await Items.findByIdAndUpdate(req.params.id, item, {})
      res.redirect(item.url);
    }
  }),     
];

exports.items_m = asyncHandler(async(req,res,next)=>{
  res.render("m")
})