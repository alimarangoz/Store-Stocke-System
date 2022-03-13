const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine","ejs")

let connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    pass:"",
    database:"stocke_system_db"
});

connection.connect(function (err) {
    if(err) throw err;
    console.log("Connection created successfully!");

});

app.get('/', function (req, res) {
    res.render("index");
});

app.get('/adding_item', function (req, res) {
    res.render("add_item");
});

app.get('/updating_item', function (req, res) {
    res.render("update_item");
});

app.get('/deleting_item', function (req, res) {
    res.render("delete_item");
});

app.get("/get_information", function (req, res) {  
    res.render("get_info");
});



app.post('/get_information', function (req, res) {
    product_id = req.body.product_id;
    query = "SELECT * FROM product WHERE id =" + (product_id);
    connection.query(query, function (err,results){
        if (err) throw err;

        if(results.length > 0){
            
        product_type_id = results[0].product_type_id;
        
        typeQuery = "SELECT * FROM product_type WHERE id = " + product_type_id;
        connection.query(typeQuery,function(err,result){
            detailQuery = "SELECT * FROM product_detail WHERE product_id = " + product_id;
            connection.query(detailQuery,function(err,resultDetail){
                if (err) res.render("get_info");
                console.log(results[0].name+", "+results[0].quantity+", "+result[0].type+", "+resultDetail[0].adding_time+", "+resultDetail[0].updating_time);
                res.render("get_info",{name:results[0].name,quantity:results[0].quantity,type:result[0].type,adding_time:resultDetail[0].adding_time,updating_time:resultDetail[0].updating_time});            
       
            });

        });
        }else{
            res.render("get_info",{error:"Could not find product that has id = "+product_id});
        }

    });
    
});


const port = process.env.PORT || 3000;
app.listen(port);