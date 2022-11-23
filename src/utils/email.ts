import nodemailer from 'nodemailer';

export const sendEmail = async (
    email: string,
    subject: string,
    text: string,
)=> {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        }); 
        console.log('Email sent');
        return true;
    } catch (error) {
        console.log('Failed to send email, reason:', error);
        return false;
    }
}