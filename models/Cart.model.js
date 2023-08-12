const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
   image : {type : String, required : true},
   name : {type : String, required : true}, 
   category : {type : String, required : true},
   price : {type : Number, required : true},
   desc : {type : String, required : true},
   weight : {type : String, required : true},
   user_id : {type : String}
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel }