require('dotenv').config();
const express = require('express');
const app = express();
const port = 80;
const routes = require('./router.js');
const cors = require('cors');

app.use(cors());
app.use(routes);

app.listen(port, () => {
    console.log(`listening port ${port}`);
})
