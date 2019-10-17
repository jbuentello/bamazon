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
 
db.connect();

//Pull the three items selected from database
db.query('SELECT item_id,department_name,stock_quantity, product_name, price FROM products', function (error, response, fields) {
  // console.log(results);

  if (!error){
    for (var i = 0; i < response.length; i++){
      itemArray.push({
        id: response[i].item_id,
        item: response[i].product_name,
        department: response[i].department_name,
        price: response[i].price,
        quantity: response[i].stock_quantity
      });
    }
  }
  else { throw error};
  console.table(itemArray);
  questionsForUsers()
});    
  
function questionsForUsers() {
  inquirer.prompt([{
    type: 'input',
    name: 'itemSelected',
    message: 'Enter the item ID of the product you would like to purchase.'
  },
  {
    type: 'input',
    name: 'quantity',
    message: 'How many of this item would you like?'
  }

  ]).then(function(userResponse){
    var item = parseInt(userResponse.itemSelected);
    var quantity = parseInt(userResponse.quantity);
    // console.log(item);
    // console.log(quantity);
    db.query('SELECT * FROM products WHERE item_id = ?', [item], function (error, response){
      if (error){
        console.log(error);
        return;
      }
      else {
        itemData = response[0];
        if (quantity > itemData.stock_quantity) {
          console.log('Insufficient quantity');
          db.end();
          return;
        }
        else {
          console.log('This product is in stock, we have ', itemData.stock_quantity, ' in stock.')
          var itemsLeft = itemData.stock_quantity - quantity
          var price = quantity*itemData.price
          db.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [itemsLeft, item], function(error, response){
            if (error){
              console.log(error);
              db.end();
              return; 
            }
            else{
              console.log(`Your total cost is $${price}.`)
              db.end();
              return;
            }
          });
        }
      }
    });
  });
  return;
}
