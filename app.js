const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine","ejs")

app.use("/api",routes);


app.get("/",function (req, res){
    res.render("index");
});

const port = process.env.PORT || 3000;

app.listen(port);
console.log("Server is running");