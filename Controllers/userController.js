const User = require('../Models/userModel')
console.log(process.env.PORT)


exports.displayUser = async(req,res) =>{
    // console.log(req.user.dataValues)
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

exports.displayUsers = async(req,res) =>{
    const {id} = req.body
    try{
      const user = await User.findAll()
      res.json(user)
    }
    catch(error){
        res.status(500).json({ message: error });
    }
}