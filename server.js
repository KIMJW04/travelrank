const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_pw = process.env.REACT_APP_API_KEY;
const api_url = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode';

app.get('/geocode', async (req, res) => {
    const { query } = req.query;
    const url = `${api_url}?query=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'X-NCP-APIGW-API-KEY-ID': client_id,
                'X-NCP-APIGW-API-KEY': client_pw,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

const port = 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
