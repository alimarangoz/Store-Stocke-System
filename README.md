# Store-Stocke-System
REST-API implementation for Store Stock System with NodeJS, by using MySQL.

## Technology
- Store Stock System API's are written using by Node.js which is Javascript framework. So it is require to install Node.js from this link to run application;
- https://nodejs.org/en/download/
- Application is created by using EJS which is generate HTML markup with plain Javascript. It is template engine to help embedeed Javascript to HTML.
- https://ejs.co/

## Server Settings
- Server is set up with Xampp Panel. Xampp has apache server and for the database it has MySQL server.

![xampp-for-apacheServer](https://user-images.githubusercontent.com/57812346/158064874-f67b998d-19f3-41de-83e9-d912d8a8d26e.png)

_Xampp Configurations_

- Server is ready to run, after that we should upload the database information from .sql file which is in the sql_file directory.

![dashboard](https://user-images.githubusercontent.com/57812346/158891469-30200b3f-31db-42fd-af74-7e621fc64075.png)

_Go to admin from dashboard_

![sql_file_inserting](https://user-images.githubusercontent.com/57812346/158891560-942535aa-46a1-410a-950f-90b444fffb00.png)

_Select the new database icon and then select sql, then copy and paste all information in the stock_system_db.sql file to the sql part and run it._

## Database System

- Store stock system uses MySQL as a DBMS which is the one of the relational database. In this project there are 3 table and these tables are 3NF. 
- Atomicity and Functional Dependecy rules are considered while creating the data tables. 

![mysql_product](https://user-images.githubusercontent.com/57812346/158977608-bcc4ea89-cc70-4312-9097-96f5b2eedfb6.png)

_There are one-to-one and one-to-many relations between tables. Each product has just one type, this means it should be one-to-one relation._
_Every product has creating and updating time and different products may have same day so it should be one-to-many relation._

## Running The Application

- After the database step, we ready to run server and application;

![appjs](https://user-images.githubusercontent.com/57812346/158892532-714a032c-9d66-4c1e-88a2-cf1dc39021b2.png)

_Using the terminal which includes root directory of project, we can run the application main method by writing "node app.js" command._

- Application uses 3000 as a port. So we can access the server as *"localhost:3000"*.

## API Usage

- In the index, page has navbar which inclues add product, update product, get product information with id. These are the properties that usable for admin.

### Add Product

- Admin can write name and quantity of product that he/she wants to add and choose its category. After the clicking "Add" button, it will add the product that user enters.
- Inputs get from Front-end side and implement database query on it by using *INSERT INTO* command. *POST* is used as *HTTP* method because some information is recorded in the database. 

![ad2](https://user-images.githubusercontent.com/57812346/158897111-c4fa21bb-ad10-47c9-91a1-d149f25ba400.png)

_Adding product to the system_

### Update Product

- Admin can update the product in this part of application. Admin selects the right input that he/she wants to change and after clicking the update button, it will update.
- Firts, forms are filled using *GET* method and checks the differences respect to ID's and each product has individual button for updating.
- Then, changed inputs get from frond-end side and they are implemented in query using *POST* method in the back-end side.

![update](https://user-images.githubusercontent.com/57812346/158894834-0ceec234-de42-4b03-a981-3e7c8fa11550.png)

_Updating product_

### Get Product Information with ID

- Admin can search the product by using ID in this endpoint. Admin enters input and hits the button and see the result of this input.
- Using *POST* method ID is get from admin and search for it using *SELECT* command in the SQL statement.

![ge2](https://user-images.githubusercontent.com/57812346/158897004-dbbad2b5-8a09-4552-9fa0-a083e5edbfbb.png)


_Get product information_

## Additional

- Dotenv module is used in this project. It holds the database host,name,password information in it. It is not in .gitignor, but it can easily implement after the session.


