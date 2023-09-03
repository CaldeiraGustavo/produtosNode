const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/nodecal.vps.webdock.cloud/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/nodecal.vps.webdock.cloud/fullchain.pem')
}
const port = 80

const routes = require('./router.js')

app.use(routes)

https.createServer(options, app).listen(port, () => {
    console.log(`listening port ${port}`)
})
