const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');


const corsOptions = {
    orgin: "*",
    optionsSuccessStatus: 200
};

const server = require('http').createServer(app);

app.use(cors(corsOptions));
app.use(bodyParser.json());

const port = '4000';
app.set('port', port);

const router = express.Router();
app.use('/', router);

require('./routes/ads.route')(router);


server.listen(port, function () {
    console.log('Server started on *: ' + port);
});

server.on('error', function (error) {
    console.log("Error in start", error);
})