
const mongoose = require('mongoose')

//creating users data schema
const UserSchema = new mongoose.Schema({
    userName : {type:String,required:true},
    email : {type:String,required:true,  unique:true},
    password:{type:String,required:true},
    role:{type:String,require:true,
        enum:["user","admin"]
    }
},{timestamps:true})

const UserData = mongoose.model('users',UserSchema);
module.exports = UserData;