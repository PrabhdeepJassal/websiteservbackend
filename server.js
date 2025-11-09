
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,             // ✅ Use 587 instead of 465
  secure: false,         // ✅ STARTTLS instead of SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // ✅ Prevents TLS block inside Render
  },
});


// NEW SIMPLIFIED ENDPOINT - Only sends auto-response
app.post('/api/send-autoresponse', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({ 
            success: false, 
            message: 'Name and email are required' 
        });
    }

    try {
        // Only send auto-response to the user
        const mailToUser = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Welcome ${name}! Thank you for connecting 🚀`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f0f4f8;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 40px 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
                                    
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #478ac9 0%, #5e9fd4 100%); padding: 50px 40px; text-align: center;">
                                            <h1 style="color: #ffffff; font-size: 32px; margin: 0 0 10px 0; font-weight: 700;">
                                                Welcome, ${name}! 👋
                                            </h1>
                                            <p style="color: #e8f4fc; font-size: 16px; margin: 0;">
                                                Thank you for reaching out through my portfolio
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td style="padding: 40px;">
                                            <p style="font-size: 18px; line-height: 1.8; color: #2d3748; margin: 0 0 20px 0;">
                                                Hi <strong>${name}</strong>,
                                            </p>
                                            
                                            <p style="font-size: 16px; line-height: 1.8; color: #4a5568; margin: 0 0 20px 0;">
                                                I'm thrilled that you've taken the time to connect with me! Your message has been successfully received, and I want to personally thank you for your interest.
                                            </p>
                                            
                                            <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f0f7ff 0%, #e8f4fc 100%); border-left: 4px solid #478ac9; border-radius: 8px; margin: 25px 0;">
                                                <tr>
                                                    <td style="padding: 25px;">
                                                        <p style="margin: 0 0 10px 0; font-size: 14px; color: #478ac9; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                                                            ✓ Message Confirmed
                                                        </p>
                                                        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #2d3748;">
                                                            I'll carefully review your message and get back to you within <strong>24-48 hours</strong>. I personally respond to every message I receive!
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <h3 style="color: #2d3748; font-size: 20px; margin: 35px 0 20px 0; font-weight: 700;">
                                                While you wait, explore my work 🚀
                                            </h3>
                                            
                                            <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                                                <tr>
                                                    <td style="padding: 8px;">
                                                        <a href="https://github.com/PrabhdeepJassal" style="display: block; text-decoration: none; background: linear-gradient(135deg, #24292e 0%, #1a1f24 100%); color: white; padding: 15px 20px; border-radius: 8px; text-align: center; font-weight: 600; font-size: 15px;">
                                                            💻 GitHub Projects
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 8px;">
                                                        <a href="https://www.linkedin.com/in/prabhdeep-singh-jassal" style="display: block; text-decoration: none; background: linear-gradient(135deg, #0077b5 0%, #005885 100%); color: white; padding: 15px 20px; border-radius: 8px; text-align: center; font-weight: 600; font-size: 15px;">
                                                            🔗 LinkedIn Profile
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 8px;">
                                                        <a href="https://leetcode.com/u/prabhdeepsinghjassal/" style="display: block; text-decoration: none; background: linear-gradient(135deg, #ffa116 0%, #ff8c00 100%); color: white; padding: 15px 20px; border-radius: 8px; text-align: center; font-weight: 600; font-size: 15px;">
                                                            🏆 LeetCode Solutions
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <p style="font-size: 16px; line-height: 1.8; color: #4a5568; margin: 25px 0 10px 0;">
                                                Looking forward to connecting with you soon!
                                            </p>
                                            
                                            <p style="font-size: 16px; line-height: 1.8; color: #2d3748; margin: 0;">
                                                Best regards,<br>
                                                <strong style="color: #478ac9; font-size: 18px;">Prabhdeep Singh</strong><br>
                                                <span style="color: #718096; font-size: 14px;">Full-Stack Developer & Quantum Computing Enthusiast</span>
                                            </p>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td style="background: #f7fafc; padding: 30px 40px; border-top: 1px solid #e2e8f0;">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td align="center">
                                                        <p style="margin: 0 0 15px 0; color: #718096; font-size: 13px; line-height: 1.6;">
                                                            📧 Need urgent assistance? Email me directly at<br>
                                                            <a href="mailto:prabhdeepsinghjassal@gmail.com" style="color: #478ac9; text-decoration: none; font-weight: 600;">
                                                                prabhdeepsinghjassal@gmail.com
                                                            </a>
                                                        </p>
                                                        <p style="margin: 15px 0 0 0; color: #a0aec0; font-size: 12px; line-height: 1.5;">
                                                            This is an automated confirmation email.
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        await transporter.sendMail(mailToUser);

        res.status(200).json({ 
            success: true, 
            message: 'Auto-response sent successfully!' 
        });

    } catch (error) {
        console.error('Error sending auto-response:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send auto-response' 
        });
    }
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'Auto-response server is running!' });
});

app.listen(PORT, () => {
    console.log(`Auto-response server running on port ${PORT}`);
});
