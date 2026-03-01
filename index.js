const express = require('express');
// טעינת ה-SDK של Render
const sdk = require('api')('@render-api/v1.0#4n4pp1wymlfl3771'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// שימוש ב-auth מתוך ה-sdk
sdk.auth(process.env.RENDER_API_KEY || 'rnd_XUznsB2yWpSQDM5BQP3CmvVQdE9k');

app.get('/services', (req, res) => {
    // קריאה לפונקציה מתוך ה-sdk
    sdk.listServices({ includePreviews: 'true', limit: '20' })
        .then(({ data }) => {
            res.json(data);
        })
     .catch(err => {
            // זה ידפיס לך בטרמינל השחור את הסיבה המדויקת
            console.error("--- Error Details ---");
            console.error(err.response ? err.response.data : err.message);
            res.status(500).json({ error: "Failed to fetch services", details: err.message });
        });
});

app.listen(port, () => {
    console.log(`Server is running! http://localhost:${port}/services`);
});