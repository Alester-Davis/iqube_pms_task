import { DataTypes } from 'sequelize'
import bcrypt from "bcryptjs"
import db from '../db.mjs'

const roleEnum = {
    admin:'admin',
    user:"user"
}

const User = db.define('user',{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    passwordConform:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isIn:[Object.values(roleEnum)]
        }
    }
})



User.beforeSave((user,options)=>{
    console.log(user)
    if(user.passwordConform!= undefined && user.password !== user.passwordConform){
        throw new Error('Passwords do not match');
    }
})

User.beforeSave(async(user,options)=>{
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
    }
    user.passwordConform = undefined
})

User.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });

export default User