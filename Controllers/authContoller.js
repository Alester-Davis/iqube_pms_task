const jwt = require("jsonwebtoken")
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const { promisify } = require('util');
const User = require("../Models/userModel")

const signTokn = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createToken = (user,statusCode,res)=>{
    const token = signTokn(user.id)
    const cookieOption = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
    }
    res.cookie('jwt',token,cookieOption)
    user.password = undefined
    console.log(user)
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
          user
        }
      });
}

exports.signup = async(req,res)=>{
    const user  = await User.create({
        name:req.body.name,
        username:req.body.username,
        password:req.body.password,
        passwordConform:req.body.passwordConform
    })
    createToken(user,201,res)
}

exports.login = async(req,res,next)=>{
    const {username,password} = req.body

    try{
        const user = await User.findOne({where:{username}})
        console.log(user)
        if(!user || !(await bcrypt.compare(password,user.password))){
            res.status(401).json({
                status: 'Failure',
                error: 
                  'Incorrect Username or Password'
                
            });
            return next(new Error("Incorrect Username or Password"))
        }
        createToken(user,200,res)
    }
    catch(error){
        next(error)
    }
}

exports.protect = async(req,res,next)=>{
    let token;
    if (req.header('Authorization') && req.header('Authorization').startsWith('Bearer')) {
        token = req.header('Authorization').split(' ')[1];
    }

    console.log(token)
    if (!token) {
        res.status(401).json({
            status: 'Failure',
            error: 
              'You are not logged in! Please log in to get access.'
            
        });
        return next(
          new Error('You are not logged in! Please log in to get access.')
        );
      }
    
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      const id = decoded.id
      const currentUser = await User.findAll({where:{id}});
      if (!currentUser) {
        res.status(401).json({
            status: 'Failure',
            error: 
              'The user belonging to this token does no longer exist.'
            
        });
        return next(
          new Error('The user belonging to this token does no longer exist.')
        );
      }
    
    //   if (currentUser.changedPasswordAt > decodedIat) {
    //     res.status(401).json({
    //         status: 'Failure',
    //         error: 
    //           'User recently changed password! Please log in again.'
            
    //     });
    //     return next(
    //       new Error('User recently changed password! Please log in again.')
    //     );
    //   }
    
      req.user = currentUser;
      next();
}
