import User from '../Models/userModel.mjs'
import pkg2 from 'bcryptjs';
const { compare ,hash } = pkg2;

export async function displayUser(req,res){
    const id = req.user[0].id
    console.log(id)
    try{
      const user = await User.findOne({where: {id}})
      res.json(user)
    }
    catch(error){
        res.status(500).json({ message: error });
    }
}

export async function displayUsers(req,res){
    const role = "user"
    try{
      const user = await User.findAll({where:{role}})
      res.json(user)
    }
    catch(error){
        res.status(500).json({ message: error });
    }
}

export async function deleteUser(req,res,next){
    const {username}  = req.body
    const user = await User.findOne({where:{username}})
    if(!user){
      res.status(401).json({
        status: 'Failure',
        error: 
          'User doesnt exist'
        
      });
      return next(new Error('User doesnt exist'))
    }
    const id = user.id
    const deletUser =await User.destroy({where:{id}})
    res.status(200).json({
      status: 'Success',
      message: 
        `User ${username} deleted successfully`
    });
}

const filterObj = (obj,...allowedFields)=>{
    const newObj = {}
    Object.keys(obj).forEach(element => {
      if(allowedFields.includes(element)){
        newObj[element] = obj[element]
      }
    })
    return newObj
}
export async function updateUser(req,res,next){
  let message
    const filterBody = filterObj(req.body,"name","username")
    const id = req.user[0].id
    const user = await User.update(filterBody,{where:{id}})
    if(user[0] >0 ){
      message = await User.findOne({where:{id}})
    }
    else{
      message = "No user found with the given id"
    }
    res.status(202).json({
      message
    })
}
