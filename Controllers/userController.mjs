import User from '../Models/userModel.mjs'
console.log(process.env.PORT)


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
