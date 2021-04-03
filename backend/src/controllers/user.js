const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res,next) => {
  await User.findOne({ email : req.body.email }).exec((error , user) => {
    if(user) 
    {
      return res.status(400).json({
        message : "User Already exists"
      })
    }
  
    const {firstName,lastName,email,password} = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName : Math.random().toString() 
    });
    _user.save((error , data) => {
      if(error)
      {
        return res.status(400).json({
          message : error
        })
      }
      if(data){
        return res.status(201).json({
          message : "User account created successfully"
        })
      }
    })
    
  })
}

exports.signin = async (req,res,next) => {

  await User.findOne({ email : req.body.email }).exec((error , user) => {
    if(error)
    {
      return res.status(400).json({
        error : error
      })
    }

    if(user)
    {
      // authenticate present in user models
      if(user.authenticate(req.body.password))
      {
        const token = jwt.sign({_id : user._id , role : user.role } , process.env.JWT_SECRET , {expiresIn : '10h'} )// '1d' => 1 day
        const {_id,firstName,lastName,email,password} = user;

        res.status(200).json({
          token,
          user : {
            _id,firstName,lastName,email,password
          }
        })

      }
      else{
        res.status(400).json({
          message : "Invalid Password"
        })
      }
    }
    else
    {
      return res.status(400).json({
        message : "Something went wrong"
      })
    }
  })

}

exports.signout = (req,res,next) => {
  res.clearCookie('token');
  res.status(200).json({
    message : "Signout successfully"
  })
}