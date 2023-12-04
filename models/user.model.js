const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

let userSchema=mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required: true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required: true}
})

let saltRound = 3

userSchema.pre("save", function(next){
    bcrypt.hash(this.password, saltRound,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            this.password = result
            console.log(this.password);
            next()
        }
    })
})
let adminSchema=mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required: true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required: true}
})


let userModel = mongoose.model("students", userSchema)
let adminModel = mongoose.model("AdminData", adminSchema)

module.exports = userModel, adminModel