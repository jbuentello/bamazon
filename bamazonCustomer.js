var mysql      = require('mysql');
var inquirer = require ('inquirer');
// var table = require ('console.table');
var db = mysql.createConnection({
  host     : '127.0.0.1',
  port     : 3306,
  user     : 'root',
  password : 'Saleen_454',
  database : 'bamazon'
});

var itemArray = [];
 
// db.connect();

//Pull the three items selected from database
db.query('SELECT item_id, product_name, price FROM products', function (error, response, fields) {
  // console.log(results);

  if (!error){
    for (var i = 0; i < response.length; i++){
      itemArray.push({
        id: response[i].item_id,
        item: response[i].product_name,
        department: response[i].department_name,
        price: response[i].price,
        quantity: response[i].price
      });
    }
  }
  else { throw error; }
  console.table(itemArray);
});    
  
function questionsForUsers() {
  inquirer.prompt([
      {
          type: 'input',
          name: 'itemSelected',
          message: 'Enter the item ID of the product you would like to purchase.'
      },
      {
          type: 'input',
          name: 'quantity',
          message: 'How many of this item would you like?'
      }
    ]);
  };
    // ]).then
 questionsForUsers()
db.end();