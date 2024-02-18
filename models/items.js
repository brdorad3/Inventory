const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name:{type: String, required:true},
    desc:{type: String, required:true},
    price:{type: Number, required:true},
    stock:{type: Number, required: true},
    genre: [{ type: Schema.ObjectId, ref: "Genre" }],
})

ItemSchema.virtual("url").get(function(){
    
})
module.exports = mongoose.model("Items", ItemSchema);