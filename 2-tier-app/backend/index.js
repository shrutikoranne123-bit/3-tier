const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from the 2026 Backend on EC2!" });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
