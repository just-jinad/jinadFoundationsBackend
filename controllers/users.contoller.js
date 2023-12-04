const userModel = require("../models/user.model")
const adminModel = require("../models/user.model")
const bcryptjs = require("bcryptjs")


const userSignup = (req, res)=>{
    console.log("user sign up page has been seen");
    console.log(req.body);
    let user = new userModel(req.body);
    user
      .save()
      .then(() => {
        console.log("details have been saved into the database");
        res.send({status:true, message:"User has been added successfully"})
      })
      .catch((err) => {
        console.log(err);
        if (err.code == 11000) {
          res.send({status:false, message: "This email has already been used" });
        } else {
        
          res.send({status:false, message: "An error occurred during sign Up!" });
        }
      });
}

const userLogin =(req, res)=>{
  console.log(req.body);
  userModel.findOne({email:req.body.email})
    .then((result)=>{
      if (result) {
        bcryptjs.compare(req.body.password, result.password, (err, response)=>{
          if (response) {
            console.log(response);
            res.send({status:true, message:"login successful", })    
          }else{
            console.log(err);
            res.send({status:false, message: "Password Issue" })
          }
        })
        // let userName = result.lastName
      }else{
        res.send({status:false, message:"Login error"})
      }
  }).catch((err)=>{
    console.log(err);
  })
}

const userDashBoard = (req, res)=>{
  console.log(req.body);
  const email=req.headers.bearer.split(' ')[1]
  userModel.findOne({email})
    .then((result)=>{
      if (result) {
        console.log(result.lastName);
        res.send({status:true, message:"login successful", result})    
      }else{
        let userName = result.lastName
        res.send({status:false, message:"Login error", userName })
      }
  }).catch((err)=>{
    console.log(err);
  })
}




                        // Admin Sign Up


                        const adminSignup = (req, res)=>{
                          console.log("Admin sign up page has been seeen");
                          console.log(req.body);
                          let user = new adminModel(req.body);
                          user
                            .save()
                            .then(() => {
                              console.log("details have been saved into the database");
                              res.send({status:true, message:"User has been added successfully"})
                            })
                            .catch((err) => {
                              console.log(err);
                              if (err.code == 11000) {
                                res.send({status:false, message: "This email has already been used" });
                              } else {
                              
                                res.send({status:false, message: "An error occurred during sign Up!" });
                              }
                            });
                      }




module.exports = {userSignup, userLogin, userDashBoard, adminSignup}