const {DataTypes}  = require('sequelize')
const bcrypt = require("bcryptjs")
const sequelize = require('../db')

const User = sequelize.define('user',{
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
    }
})

User.beforeSave((user,options)=>{
    if(user.password !== user.passwordConform){
        throw new Error('Passwords do not match');
    }
})

User.beforeSave(async(user,options)=>{
    if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
    }
    user.passwordConform = undefined
})

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });

module.exports = User