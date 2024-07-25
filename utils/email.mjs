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


export async function sendMail(inviteLink) {
  console.log(inviteLink)
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', 
    to: "alesterkvp@gmail.com", 
    subject: "Hello ✔",
    text: "Hello world?",
    html: `<b>${inviteLink}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
}
