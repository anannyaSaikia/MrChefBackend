const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name : {type : String, required : true}, 
   phNumber : {type : Number, required : true},
   email : {type : String, required : true},
   password : {type : String, required : true}
});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };