const express = require('express');
const router = express.Router();
const mysql = require('mysql');
require('dotenv').config();


let connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USER,
    pass:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

connection.connect(function (err) {
    if(err) throw err;
});

router.get('/', function (req, res) {
    res.render("index");
});

router.get('/add_item', function (req, res) {
    res.render("add_item");
});

router.post("/add_item",function(req, res){

    if(typeof req.body.product_name !== 'undefined' && req.body.product_quantity !== 'undefined') {

        let product_name = req.body.product_name;
        let product_quantity = req.body.product_quantity;
        let category = req.body.category;
        let queryAdding = "INSERT INTO product (name,quantity,product_type_id) VALUES('" + product_name + "','" + product_quantity + "','" + category + "')";

        connection.query(queryAdding,function(err,result){
            let product_id = result.insertId;
            if(err){
                res.render("add_item",{error:"Product is not added, Try Again!"});
            }
                let queryDetail = "INSERT INTO product_detail (adding_time,updating_time,product_id) VALUES(NOW(),NOW()," + product_id + ")";
                connection.query(queryDetail,function(err){
                    if(!err){
                        res.render("add_item",{success:"Product is successfully added!"});
                    }        
                });
        });

    }else{
        res.render("add_item",{error:"Product is not added, Try Again!"});
    }

});

router.get('/deleting_item', function (req, res) {
    res.render("delete_item");
});


router.get("/get_information", function (req, res) {  
    res.render("get_info");
});

router.post('/get_information', function (req, res) {
    if(typeof (req.body.product_id) !== 'undefined'){
        product_id = req.body.product_id;
        query = "SELECT product.id, product.name, product.quantity ,pt.type, pd.adding_time, pd.updating_time FROM product LEFT JOIN product_type as pt ON pt.id = product.product_type_id LEFT JOIN product_detail as pd ON pd.product_id = product.id WHERE product.id =" + (product_id);
        connection.query(query, function (err,results){
            if (err) throw err;

            if(results.length > 0){

                product_name = results[0].name;
                product_quantity = results[0].quantity;
                product_type = results[0].type;
                product_adding_time = results[0].adding_time;
                product_updating_time = results[0].updating_time;

                res.render("get_info",{name:product_name,type:product_type,quantity:product_quantity,adding_time:product_adding_time,updating_time:product_updating_time});

            }else{
                res.render("get_info",{error:"Could not find product that has id = "+product_id});
            }
        });
    }else{
        console.log("ID is not taking from form as a body!");
        res.render("get_info",{error:"Error occurs about the ID that you enter. Try again, please!"});
    }
});

router.get('/updating_item', function (req, res) {

    let queryProduct = "SELECT product.id, product.name, product.quantity ,pt.type, pd.adding_time, pd.updating_time FROM product LEFT JOIN product_type as pt ON pt.id = product.product_type_id LEFT JOIN product_detail as pd ON pd.product_id = product.id;"
    connection.query(queryProduct,function(err,result){
        if (err) throw err;
        let productArray = [];
        for(let i = 0; i < result.length; i++) {
            productArray.push(
                {
                idEjs : result[i].id,
                nameEjs : result[i].name,
                quantityEjs : result[i].quantity,
                typeEjs : result[i].type,
                adding_timeEjs : result[i].adding_time,
                updating_timeEjs : result[i].updating_time,
                }
            );    
        }
        
        res.render("update_item",{productArrayEjs:productArray,loop:result.length});
        
        
    });
});

router.post("/updating_item",function(req,res){

    if(typeof req.body.id !== 'undefined' && req.body.inputName !== 'undefined' && req.body.categories !== 'undefined'){
        

        id_product = req.body.id;
        name_product = req.body.inputName;
        quantity = req.body.inputQuantity;
        categories = req.body.categories;

        if(categories == "Food"){
            categories = 1;
        }else if(categories == "Clothing"){
            categories = 2;
        }else if(categories == "Cleaning"){
            categories = 3;
        }

        let controlQuery = "SELECT * FROM product JOIN product_type ON product_type.id = product_type_id";
        connection.query(controlQuery, function(err,results){
            if(err) throw err;
            get_id = results[0].id;
            get_name = results[0].name;
            get_quantity = results[0].quantity;
            get_type = results[0].product_type_id;
            


            if(!((name_product == get_name) && (quantity == get_quantity) && (categories == get_type))){
                let updateQuery = "UPDATE product SET name = '"+name_product+"', quantity = '"+quantity+"', product_type_id = "+categories+" WHERE id = " +id_product+ ";";
                connection.query(updateQuery,function(err){
                    if (err) throw err;
                    let detailQuery = "UPDATE product_detail SET updating_time = NOW() WHERE product_id =" +id_product+ " ;";
                    connection.query(detailQuery,function(err){
                        if (err) throw err;
                    });
                    res.render("update_item",{success:"Stock successfully updated!"});
                });
            }else{
                res.render("update_item",{warning:"Nothing changes in the stock."});
            }
            
        });
    }else{
        res.render("update_item",{warning:"Check, the items and try again!"});
    }
    
});


module.exports = router;