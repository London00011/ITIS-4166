//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const {MongoClient} = require('mongodb');
const storyRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoutes');
const {initCollection} = require('./models/connection');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
let url = 'mongodb://localhost:27017';
app.set('view engine', 'ejs');

//mount middlware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

MongoClient.connect(url, { useUnifiedTopology: true })
.then(client =>{
    db = client.db('demos'); //change this for project 2
    initCollection(db);
    //start the server
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    })
})

//set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.use('/connections', connectionRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);

});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});