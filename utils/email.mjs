import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port:465,
  secure:true,
  auth: {
    user:'alesterdavis115@gmail.com',
    pass:'fmwmeychranufyyo',
  },
});


export async function sendMail(inviteLink,email) {
  console.log(inviteLink)
  const info = await transporter.sendMail({
    from: 'Admin', 
    to: `${email}`,
    subject: "INVITION LINK (SIGNUP)",
    text: "Admin want you you to join our team. Please use the link to sing up",
    html: `<b>${inviteLink}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
}
