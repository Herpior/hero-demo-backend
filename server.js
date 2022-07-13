const express = require('express');
const apiroutes = require('./routes/apiroutes')
const mongoose = require('mongoose');

let app = express();

app.use(express.static("build"));
app.use(express.json());

const port = process.env.PORT || 3001;
const mongo_user = process.env.MONGODB_USER;
const mongo_pw = process.env.MONGODB_PASSWORD;
const mongo_url = process.env.MONGODB_URL;
const mongo_db = "heroDatabase"

const connection_url = "mongodb+srv://"+mongo_user+":"+mongo_pw+"@"+mongo_url+"/"+mongo_db+"?retryWrites=true&w=majority";

mongoose.connect(connection_url).then(
    ()=> console.log("successfully connected"),
    (error)=>console.log("failed to connect, error: "+error)
)

mongoose.set("toJSON",{virtuals:true});


app.use("/api", apiroutes);

app.listen(port);

console.log("started in port "+port);