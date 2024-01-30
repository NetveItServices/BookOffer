const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
const mongoose = require('mongoose');

// Enable CORS for all routes
app.use(cors());


//{ useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost:27017/crud', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("db")
    }
});

const userSchema = new mongoose.Schema({
    userid: String,
    name: String,
    phone: Number,
    email: String
});
const User = mongoose.model('User', userSchema);

app.use(express.json());

const bookSchema = new mongoose.Schema({
    userid: String,
    Sno: Number,
    Booktitle: String,
    Author: String,
    Genere: String,
    Yearofpublication: Number,
    ISBN: String,
});

const Book = mongoose.model('Book', bookSchema);

app.post('/create', (req, res) => {

    const requestData = req.body;

    let person = {
        userid: 'user-' + Math.floor(Math.random() * (2000 - 1 + 1)) + 1,
        name: requestData.name,
        phone: requestData.phone,
        email: requestData.email
    }
    console.log("person ==", person)
    // Save the user to the database
    User.create(person, (err, result) => {
        if (err) {
            console.error(err);
            res.json({ statuscode: '500', data: [], mesg: 'user does not create!' });
        } else {
            console.log('User saved to the database:', result);
            res.json({ statuscode: '200', data: person, mesg: 'user created succesfully!' });
        }
    });
});                                             

// app.get('/api/hello', (req, res) => {

//     res.json({ statuscode: '200', data: [], mesg: '' });

//});
app.post('/api/books/create', (req, res) => {

    const requestData = req.body;

    let bookDetails = {
        userid: requestData.userid,
        Sno: requestData.Sno,
        Booktitle: requestData.Booktitle,
        Author: requestData.Author,
        Genere: requestData.Genere,
        Yearofpublication: requestData.Yearofpublication,
        ISBN: requestData.ISBN
    }
    console.log("bookDetails==", bookDetails)

    Book.create(bookDetails, (err, result) => {
        if (err) {
            console.error(err);
            res.json({ statuscode: '500', data: [], mesg: 'user does not create!' });
        } else {
            console.log('User saved to the database:', result);
            res.json({ statuscode: '200', data: [], mesg: 'user created succesfully!' });
        }
    })
});

app.post('/api/books/update', (req, res) => {

    const requestData = req.body;

    let bookDetails = {
        userid: requestData.userid,
        Sno: requestData.Sno,
        Booktitle: requestData.Booktitle,
        Author: requestData.Author,
        Genere: requestData.Genere,
        Yearofpublication: requestData.Yearofpublication,
        ISBN: requestData.ISBN
    }
    console.log("bookDetails==", bookDetails)

    Book.update({ Sno: requestData.Sno, userid: requestData.userid }, bookDetails, (err, result) => {
        if (err) {
            console.error(err);
            res.json({ statuscode: '300', data: [], mesg: 'book details does not update!' });
        } else {
            console.log('Book saved to the database:', result);
            res.json({ statuscode: '100', data: [], mesg: 'update the book details' });
        }
    })
});

app.post('/api/books/view', (req, res) => {

    const requestData = req.body;

    Book.find({ userid: requestData.userid }, (err, result) => {
        console.log(err, result)
        if (err) {
            console.error(err);
            res.json({ statuscode: '500', data: [], mesg: 'books record does not found!' });
        } else {
            // console.log('User saved to the database:', result);
            res.json({ statuscode: '200', data: result, mesg: 'books record found!' });
        }
    })
});

app.delete('/api/books/delete', (req, res) => {

    const requestData = req.body;


    Book.deleteOne({ Sno: requestData.Sno, userid: requestData.userid }, (err, result) => {
        if (err) {
            console.error(err);
            res.json({ statuscode: '300', data: result, mesg: 'not delete the book detail!' });
        } else {
            //console.log('Book saved to the database:', result);
            res.json({ statuscode: '100', data: [], mesg: 'delete the book detail' });
        }
    })
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

