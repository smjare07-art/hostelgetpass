const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({

service:"gmail",

auth:{
user:"smjare07@gmail.com",
pass:"lrjrzczuuumvzdly"
}

})

const sendMail = async(to,subject,text)=>{

await transporter.sendMail({

from:"Hostel Security <yourgmail@gmail.com>",
to,
subject,
text

})

}

module.exports = sendMail