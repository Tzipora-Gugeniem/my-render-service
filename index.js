const express = require('express');
const axios = require('axios'); // נשתמש ב-Axios במקום ב-SDK הבעייתי
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/services', async (req, res) => {
    try {
        const response = await axios.get('https://api.render.com/v1/services', {
            headers: {
                'Accept': 'application/json',
                // המפתח נלקח מה-Environment Variable שהגדרת ב-Render
                'Authorization': `Bearer ${process.env.RENDER_API_KEY || 'rnd_XUznsB2yWpSQDM5BQP3CmvVQdE9k'}`
            }
        });

        res.json(response.data); // מחזיר את רשימת השירותים
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ 
            error: "Failed to fetch services", 
            message: error.response ? error.response.data : error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});