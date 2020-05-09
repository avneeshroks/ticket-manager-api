const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const url = process.env.MONGO_URL; 
const app = express();
const port = 8080;

const customers = require('./routes/customers');
// const experiences = require('./routes/experiences');
// const skills = require('./routes/skills');
// const documents = require('./routes/documents');

mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes 
app.use('/customers', customers);
// app.use('/experiences', experiences);
// app.use('/skills', skills);
// app.use('/documents', documents);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;

    res
    .status(status)
    .json({
        error : {
            message : err.message
        }
    })
})

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.end("Connected !!");
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});
