const express = require('express');
const app = express();
const port = 3000;

//sets view engine to "Pug"
app.set('view engine', 'pug');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));


// handling our routes
const homeRouter = require('./routes');
const aboutRouter = require('./routes/about');
const projectRouter = require('./routes/project')

app.use(homeRouter);
app.use('/about', aboutRouter);
app.use('/project', projectRouter);

// error handlers for 404 and 500 status codes
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Oh no! It looks like something went wrong.";
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status = 404;
        console.log("There was an error");
        res.render('error404', err);
    } else {
        err.message = err.message;
        err.status = 500;
        console.error("There was a server error");
        res.render('error500', err);
    };
});


app.listen(port, () => {
  console.log(`The app is running on Port: ${port}`)
})
