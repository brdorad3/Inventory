const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name:{type: String, required:true},
    desc:{type: String, required:true},  
})

CategorySchema.virtual("url").get(function(){
    return "/items/cat_list/" + this._id;
})
module.exports = mongoose.model("Category", CategorySchema);