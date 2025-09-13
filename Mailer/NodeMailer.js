
require('dotenv').config()
const nodemailer = require('nodemailer');


const SendMail = async ({contractId,deviceCount,batteriesShipped,threshold}) => {

    const transporter = nodemailer.createTransport({

        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOption = {

        from: process.env.EMAIL_ADMIN,
        to: process.env.EMAIL_ADMIN,
        subject: `⚠️ PBR Battery Shipment Limit Reached (Contract: ${contractId})`,
        text: 'Kindly respond the Feedback',
        html: `<h2>The battery shipment limit for PBR contract ${contractId} has been reached.</h2>
            <h3>- Devices under contract: ${deviceCount}</h3>
            <h3>- Batteries shipped:  ${batteriesShipped}</h3>
            <h3>- Threshold: ${threshold}</h3>
            <p>Further shipments are BLOCKED until manual review.</p>`
    }
    try {

        await transporter.sendMail(mailOption)
        res.send({ message: 'Mail send successfully' })
        console.log("Mail send successfully");

    } catch (error) {

    }

}


module.exports = SendMail
