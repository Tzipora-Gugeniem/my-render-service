const express = require('express');
const axios = require('axios'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        const apiKey = process.env.RENDER_API_KEY;
        if (!apiKey) {
            return res.status(500).send("<h1>שגיאה: חסר API Key במערכת</h1>");
        }

        const response = await axios.get('https://api.render.com/v1/services', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const services = response.data;

        // בניית דף HTML מעוצב
        let htmlContent = `
        <!DOCTYPE html>
        <html lang="he" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>רשימת האפליקציות שלי</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 40px; }
                h1 { color: #333; text-align: center; }
                table { width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 15px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
                th, td { padding: 15px; text-align: right; border-bottom: 1px solid #eee; }
                th { background-color: #007bff; color: white; }
                tr:hover { background-color: #f1f1f1; }
                .status-active { color: green; font-weight: bold; }
                .link-btn { text-decoration: none; color: #007bff; border: 1px solid #007bff; padding: 5px 10px; border-radius: 4px; transition: 0.3s; }
                .link-btn:hover { background: #007bff; color: white; }
            </style>
        </head>
        <body>
            <h1>האפליקציות שלי ב-Render</h1>
            <table>
                <thead>
                    <tr>
                        <th>שם השירות</th>
                        <th>סוג</th>
                        <th>סטטוס</th>
                        <th>קישור</th>
                    </tr>
                </thead>
                <tbody>
        `;

        services.forEach(item => {
            const s = item.service;
            htmlContent += `
                <tr>
                    <td><strong>${s.name}</strong></td>
                    <td>${s.type}</td>
                    <td class="status-active">${s.suspended === 'not_suspended' ? 'פעיל' : 'מושהה'}</td>
                    <td><a href="${s.serviceDetails.url}" target="_blank" class="link-btn">למעבר לאתר</a></td>
                </tr>
            `;
        });

        htmlContent += `
                </tbody>
            </table>
        </body>
        </html>
        `;

        res.send(htmlContent); // שולח את ה-HTML במקום ה-JSON

    } catch (error) {
        res.status(500).send("<h1>שגיאה בטעינת הנתונים</h1>");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});