const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_pw = process.env.REACT_APP_API_KEY;

module.exports = function (app) {
    app.use(
        '/api/geocode',
        createProxyMiddleware({
            target: 'https://naveropenapi.apigw.ntruss.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api/geocode': '/map-geocode/v2/geocode',
            },
            onProxyReq: (proxyReq, req, res) => {
                proxyReq.setHeader('X-NCP-APIGW-API-KEY-ID', client_id);
                proxyReq.setHeader('X-NCP-APIGW-API-KEY', client_pw);
            },
        })
    );
};
