const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send-autoresponse", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name & email required"
            });
        }

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "Prabhdeep Singh <noreply@yourdomain.com>",
                to: email,
                subject: `Thank you for reaching out, ${name}!`,
                html: `
                    <h1>Hello ${name} 👋</h1>
                    <p>I have received your message:</p>
                    <blockquote>${message}</blockquote>
                    <p>I will get back to you shortly!</p>
                    <br>
                    <strong>- Prabhdeep Singh</strong>
                `
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.log("Resend error:", errorBody);
            return res.status(500).json({
                success: false,
                message: "Resend failed"
            });
        }

        res.json({
            success: true,
            message: "Auto-response sent!"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

app.get("/", (req, res) => {
    res.json({ status: "Auto-response server online" });
});

app.listen(10000, () => console.log("Server running on 10000"));
