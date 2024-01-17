const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
//{ useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb://localhost:27017/crud', (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("db")
    }
});

const userSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String
  });   
  const User = mongoose.model('User', userSchema);

app.use(express.json());




app.post('/create', (req, res) => {

    const requestData = req.body;

    let person = {
             name: requestData.name,
             phone: requestData.phone,
             email: requestData.email
    }
    console.log("person ==",person)
      // Save the user to the database
      User.create(person, (err, result) => {
        if (err) {
          console.error(err);
          res.json({ statuscode: '500', data: [], mesg: 'user does not create!' });
        } else {
          console.log('User saved to the database:', result);
          res.json({ statuscode: '200', data: [], mesg: 'user created succesfully!' });
        }
      });
      
   
});

app.get('/api/hello', (req, res) => {

    res.json({ statuscode: '200', data: [], mesg: '' });
   
});
app.post('/api/books/create', (req, res) => {

    const requestData = req.body;
    res.json({ statuscode: '200', data: [], mesg: '' });
});

app.post('/api/books/update', (req, res) => {

    const requestData = req.body;
    res.json({ statuscode: '200', data: [], mesg: '' });
});

app.post('/api/books/view', (req, res) => {

    const requestData = req.body;
    res.json({ statuscode: '200', data: [], mesg: '' });
});

app.post('/api/books/delete', (req, res) => {

    const requestData = req.body;
    res.json({ statuscode: '200', data: [], mesg: '' });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

