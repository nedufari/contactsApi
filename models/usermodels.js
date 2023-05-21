const mongoose =require('mongoose')

const UserSchema=mongoose.Schema({
    name:{type:String, required:[true,"please provide a name"]},
    email:{type:String, required:[true,"please provide a valid email address"]},
    password:{type:String, required:[true,"please provide a password"]}
},
{
    timestamps:true
})

module.exports=mongoose.model("User",UserSchema) //contact name and the schema name 