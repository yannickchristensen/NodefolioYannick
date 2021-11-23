const nodemailer = require("nodemailer");
const router = require("express").Router();

const mailTransporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "yannicknodefolio@hotmail.com",
        pass: "123nodefolio"
    }
})

router.post("/api/contact", async (req, res) => {
    const email = {
        from: req.body.email,
        to: "yannickbrot@gmail.com",
        subject: "new mail from Nodefolio",
        text: `
            From: ${req.body.name}\n
            Email: ${req.body.email}\n
            Message: ${req.body.message}\n
        `
    };

    try{
        await mailTransporter.sendMail(email)
    }
    catch (err){
        res.statusCode = 400;
    }
    res.send();
});

module.exports = {
    router
};