const express = require("express");
const path = require("path")
const app = express();
var mongoose = require('mongoose')
const bodyparser = require("body-parser");
mongoose.connect('mongodb://127.0.0.1:27017/contactDance', {useNewUrlParser: true})
const port = 8000;


var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
var Contact = mongoose.model('Contact', contactSchema);

    app.use('/static', express.static('static'))
app.use(express.urlencoded())


app.set("view engine", "pug");//set the template engin
app.set("views", path.join(__dirname, "views"))//set the views directory

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
   var myData = new Contact(req.body);
   myData.save().then(() =>{
    res.send("This item has been saved to the database")
   }).catch(()=>{
     res.status(400).send("Item was not saved to the database")
   });
    // res.status(200).render('contact.pug');
});



app.listen(port, () => {
    console.log(`the application started successfully on port ${port}`);

})