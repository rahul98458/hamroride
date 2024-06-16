
const express = require('express')
const dbConnect = require('./src/db/connection')
const app = express()
const userRoute = require('./src/routes/user');
const searchRideRoute = require('./src/routes/searchRide');
const publishRideRoute = require('./src/routes/publishRide');
require('dotenv').config()
app.use(express.json())

const port = process.env.PORT
dbConnect()
var cors = require('cors');
app.use(cors())

app.use(userRoute);
app.use(searchRideRoute);
app.use(publishRideRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
