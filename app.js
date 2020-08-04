const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });


//EXPRESS STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded())

// PUG STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
})

//mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    gender: String,
    address: String,
    message: String
});

const contact = mongoose.model('contact', contactSchema);

app.post('/submit', (req, res) => {

    var contactData = new contact(req.body);
    contactData.save().then(() => {
        res.send("Form submitted successfully");
    }).catch(() => {
        res.status(400).send("Form not submitted");
    });

})


// STARTING SERVER
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});