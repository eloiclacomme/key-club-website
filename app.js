const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const ejsMate = require('ejs-mate');
const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//main page
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/signup', (req, res) => {
    res.render('pages/signup');
})

app.get('/tutoring', (req, res) => {
    res.render('pages/tutoring');
})

app.get('/initiatives', (req, res) => {
    res.render('pages/initiatives');
})

app.get('/why', (req, res) => {
    res.render('pages/why');
})

//form
app.post('/', (req, res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>New Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eastchesterkeyclub@gmail.com',
            pass: 'xzcwstjslwyrgjxe'
        }
    })
    const mailOptions = {
        from: req.body.email,
        to: 'eastchesterkeyclub@gmail.com',
        subject: `MESSAGE FROM ${req.body.name} (${req.body.email}):`,
        text: `Message: ${req.body.message}.\nReply back to: ${req.body.email}.`,
        html: output
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } 
        res.render('pages/submit');
    })
})

app.listen(port, (req, res) => {
    console.log(`Serving on port ${port}`)
})