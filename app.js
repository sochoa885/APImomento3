const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const controllerCom = require('./controllers/computer_controller');
const controllerUser = require('./controllers/user_controller');
const app = express()
const port = process.env.PORT | 3000

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.use(controllerCom);

app.use(controllerUser);


mongoose.connect('mongodb://localhost:27017/computers_db',{
    useNewUrlParser:true,
    useUnifiedTopology:true

},(err, res) => {
    if(err) throw err;
    console.log("BD connect");
})
app.listen(port, () => {
    console.log(`API Listening at http://localhost:${port}`)
  })

