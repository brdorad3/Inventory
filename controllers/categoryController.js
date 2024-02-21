const Items = require('../models/items')
const Category = require('../models/category')

const { body, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");


exports.cat_list = asyncHandler(async (req, res, next) => {
    
      const category = await Category.find().sort({name:1}).exec();
     
      res.render("cat_list", { categories: category });
  });

exports.cat_detail = asyncHandler(async (req, res, next) => {
    
    const category = await Category.findById(req.params.id).populate('name').exec();
   
    res.render("cat_detail", { categories: category });
});
exports.cat_create_get = asyncHandler(async(req, res, next)=>{
    try{
    const category = await Category.find().sort({name:1}).exec();
    res.render("cat_create", { title:"Create category", categories: category });
    }catch(err){
        return next(err);
    }
});

exports.cat_create_post = [
      body("name", "title must not be empty").trim().isLength({min:1}).escape(),
      body("desc", "desc must not be empty").trim().isLength({min:1}).escape(),

      asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
    const category = new Category({
        name:req.body.name,
        desc:req.body.desc,
    });
    if (!errors.isEmpty()) {
        const allCategories = await Category.find().sort({ name: 1 }).exec();
        
        res.render("cat_create", {
          title: "Create Category",
          categories: allCategories,
          category: category,
          errors: errors.array(),
        });
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }),     
];

exports.cat_delete_get = asyncHandler(async(req, res, next)=>{
    res.render("cat_delete");
});

exports.cat_delete_post = asyncHandler(async(req, res, next)=>{
    await Category.findByIdAndDelete(req.params.id).exec();
    res.redirect("/items/cat_list");
});

exports.cat_update_get = asyncHandler(async(req, res, next)=>{
    res.render("cat_create");
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
    res.render("cat_create", { title:"Update Category", items: items, categories: allCategories });
  } catch (err) {
    return next(err);
  }
});
exports.cat_update_post = [

    body("name", "title must not be empty").trim().isLength({min:1}).escape(),
    body("desc", "desc must not be empty").trim().isLength({min:1}).escape(),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
  const category = new Category({
      name:req.body.name,
      desc:req.body.desc,
      _id: req.params.id,
  });
  if (!errors.isEmpty()) {
      const allCategories = await 
       
        Category.find().sort({ name: 1 }).exec()
     

      
      res.render("cat_create", {
        title: "Update Category",
        
        categories: allCategories,
        category: category,
        errors: errors.array(),
      });
    } else {
      await Category.findByIdAndUpdate(req.params.id, category, {})
      res.redirect(category.url);
    }
  }),     
];