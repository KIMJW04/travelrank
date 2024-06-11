const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const client_id = 'YOUR_CLIENT_ID';
const client_pw = 'YOUR_CLIENT_SECRET';
const api_url = 'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=';

app.post('/geocode', async (req, res) => {
    const { address } = req.body;
    const add_urlenc = encodeURIComponent(address);
    const url = `${api_url}${add_urlenc}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'X-NCP-APIGW-API-KEY-ID': client_id,
                'X-NCP-APIGW-API-KEY': client_pw,
            }
        });
        if (response.data.addresses.length > 0) {
            const { x, y } = response.data.addresses[0];
            res.json({ longitude: x, latitude: y });
        } else {
            res.status(404).json({ error: 'No coordinates found for the given address' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = 5001; // 다른 포트 사용
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
