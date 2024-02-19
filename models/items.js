const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name:{type: String, required:true},
    desc:{type: String, required:true},
    price:{type: Number, required:true},
    stock:{type: Number, required: true},
    genre: [{ type: Schema.ObjectId, ref: "Category" }],
})

ItemSchema.virtual("url").get(function(){
    return '/items/items_list/'+ this._id;
})
module.exports = mongoose.model("Items", ItemSchema);