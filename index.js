const express = require('express')
const app = express()
const port = 8080

const routes = require('./router.js')

app.use(routes)

app.listen(port, () => {
    console.log(`listening port ${port}`)
})