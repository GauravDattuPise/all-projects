const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');

const app = express()

app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://gauravpise87:Gaurav2001@gauravdb.crgpvot.mongodb.net/GauravDBProject4",

    {useNewUrlParser : true}
)
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log(err));

app.use("/",route)

app.listen(3000, () => {
    console.log("server is running on ", 3000);
})
