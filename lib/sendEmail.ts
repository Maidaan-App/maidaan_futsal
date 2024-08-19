import nodemailer from 'nodemailer';

interface messageDetails {
    subject:String;
    message: String;
  }

export const sendEmail = async(recipientEmail: string, messageDetails: messageDetails) => {
    try {
        const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
        });

        const mailOptions = {
            to: recipientEmail,
            subject:`${messageDetails.subject}`,
            html: `<p> ${messageDetails.message}</p>`
          };

        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}