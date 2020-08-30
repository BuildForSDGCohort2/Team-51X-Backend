// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const upload = require('express-fileupload');
const apiRouter = require('./apiRouter').router;

let PORT = 3001;

// Body Parser configuration
// app.use(upload());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(cookieParser());

// allow cors requests from any origin and with credentials
// app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

// Configure routes
app.use('/api/', apiRouter);

// Launch server
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue dans Afya</h1>');
});

// global error handler
// app.use(errorHandler);

app.listen(PORT, () =>
    console.log('Server en écoute sur:' + PORT)
);
