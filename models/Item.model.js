const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
   image : {type : String, required : true},
   name : {type : String, required : true}, 
   category : {type : String, required : true},
   price : {type : Number, required : true},
   desc : {type : String, required : true},
   weight : {type : String, required : true}
});

const ItemModel = mongoose.model("items", itemSchema);

module.exports = { ItemModel }