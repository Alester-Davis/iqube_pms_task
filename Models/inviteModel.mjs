import { DataTypes } from "sequelize";
import db from '../db.mjs'

const Invite = db.define('invite',{
    inviteLink:{
        type:DataTypes.INTEGER
    }
})

Invite.sync().then(()=>{
    console.log("created")
})

export default Invite

