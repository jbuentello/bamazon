var mysql      = require('mysql');
var inquirer = require ('inquirer');
// var table = require ('console.table');
var db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'Saleen_454',
  database : 'bamazon'
});

var itemArray = [];
 
db.connect();

//Pull the three items selected from database
db.query('SELECT item_id, product_name, price FROM products', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
})
  if (!error){
    for (var i = 0; i < response.length; i++){
      itemArray.push({
          id: response[i].item_id,
          item: response[i].product_name,
          price: response[i].price,
          department: response[i].department_name
      });
  }
    console.table(itemArray);
    question1();

  //Set up questions for users

// db.connect(function(error) {
//   if (error) throw error;
//   db.query('SELECT * FROM products', 
// function (error, results, fields) {
//     if (error) console.log('OH SHIT');
//     console.log(results);
//   });
// });
 
db.end();