import pkg1 from 'jsonwebtoken';
const { sign, verify } = pkg1;
import crypto from 'crypto';
import pkg2 from 'bcryptjs';
const { compare } = pkg2;
import { promisify } from 'util';
import { config } from 'dotenv';

config({ path: './config.env' });
import User from "../Models/userModel.mjs";
import { where } from 'sequelize';
import Invite from '../Models/inviteModel.mjs';

const signTokn = (id)=>{
    return sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createToken = async (user,statusCode,res)=>{
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

export async function signup(req,res,next){
    const role = req.body.role
    if(role === "admin"){
      res.status(401).json({
        status: 'Failure',
        error: 
          'Can\'t register with role "admin"'
        
      });
      next(new Error('Can\'t register with role "admin"'))
    }
    const user  = await User.create({
        name:req.body.name,
        username:req.body.username,
        password:req.body.password,
        passwordConform:req.body.passwordConform,
        role:"user"
    })
    console.log("User created :",user.toJSON())
    if(user){
        const id = req.invite.id
        let message = await Invite.destroy({where:{id}})
        console.log(message)
        createToken(user,201,res)
    }
    
}

export async function login(req,res,next){
    const {username,password} = req.body
    try{
        const user = await User.findOne({where:{username}})
        console.log(user)
        if(!user){
            res.status(401).json({
                status: 'Failure',
                error: 
                  'Username doesn\'t exist'
                
            });
            return next(new Error('Username doesn\'t exist'))
        }
        if(!(await compare(password,user.password))){
          res.status(401).json({
            status: 'Failure',
            error: 
              'Incorrect Password'
            
        });
        return next(new Error("IncorrectPassword"))
        }
        createToken(user,200,res)
    }
    catch(error){
        next(error)
    }
}

export async function protect(req,res,next){
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
    
      const decoded = await promisify(verify)(token, process.env.JWT_SECRET);
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
    
      req.user = currentUser;
      next();
}


export function restrict(...roles){
  return (req,res,next)=>{
    if(!roles.includes(req.user[0].role)){
      res.status(401).json({
        status: 'Failure',
        error: 'You dont have permission to access this route'
    });
      next(new Error("You dont have permission to access this route"))
    }
    next()
  }
}
