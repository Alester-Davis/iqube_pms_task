import Invite from "../Models/inviteModel.mjs";
import { sendMail } from "../utils/email.mjs";
import crypto from 'crypto'

function randomNum(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log(resetToken)
    const min = 10000;
    const max = 99999;
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInteger
}

export async function generateLink(req,res,next){
    let inviteLink = randomNum()
    const check = await Invite.findAll({where:{inviteLink}})
    console.log(check)
    if(check.length !== 0){
        console.log(inviteLink)
        inviteLink = randomNum()
    }
    console.log(inviteLink)
    const num = await Invite.create({
        inviteLink
    })
    console.log(num.inviteLink)
    const link = `${req.protocol}://${req.get(
        'host'
      )}/api/v1/signup?inviteNo=${num.inviteLink}`;
    await sendMail(link)
    res.json({
        status:"success",
        message:"message sent successfully"
    })
}

export async function receiveLink(req,res,next){
    const inviteLink = req.query.inviteNo
    const used = req.query.used
    const invite = await Invite.findOne({where:{inviteLink}})
    console.log("Invite Link : ",invite)
    if(inviteLink === undefined){
        res.json({
            status:"failure",
            message:"The user cannot login without invite link"
        })
        next(new Error("The user cannot login without invite link"))
    }
    if(!invite){
        res.json({
            status:"failure",
            message:"This link doesnt exist"
        })
        next(new Error("The link doesnt exist"))
    }
    req.invite = invite
    next()
}