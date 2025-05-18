const express = require('express');
const dotenv = require('dotenv');
const indexRouter = require('./routes/Index')
const customerRouter = require('./routes/Customer')
const adminRouter = require('./routes/Admin')
const cors = require('cors');
/*
CORS or Cross-Origin Resource Sharing in Node. js is a mechanism by which a front-end client can make requests for resources to an external back-end server. The single-origin policy does not allow cross-origin requests and CORS headers are required to bypass this feature.
*/

dotenv.config({ path: "./config/config.env" })
var DB_Connect = require('./dbconnection/db_connect')
const PORTNO = process.env.PORTNO || 4000

const app = express()
//Connection TO MongoDB 
DB_Connect(process.env.DB_NAME, process.env.DB_URL)

//Static Files
app.use('/uploaddocuments', express.static('uploaddocuments'))

//multiple files
app.use('/productimages', express.static('productimages'))

//Returns middleware that only parses json
app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/*
set routes
*/
app.use("/", indexRouter)
app.use("/customer", customerRouter)
app.use("/admin", adminRouter)



app.listen(PORTNO, () => {
    console.log(`Server Listening at http://localhost:${PORTNO}`)
})