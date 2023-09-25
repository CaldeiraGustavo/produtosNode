require('dotenv').config();
const express = require('express');
const app = express();
const port = 80;
const routes = require('./router.js');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

const privateKey  = fs.readFileSync('./certificates/privkey.pem', 'utf8');
const certificate = fs.readFileSync('./certificates/fullchain.pem', 'utf8');

app.use(cors());
app.use(routes);

const credentials = {key: privateKey, cert: certificate};

// your express configuration here
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(port);