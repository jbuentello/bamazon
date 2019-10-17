var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'Saleen_454',
  database : 'bamazon'
});
 
db.connect();
 
db.query('SELECT item_id, product_name, price FROM products', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

// db.connect(function(error) {
//   if (error) throw error;
//   db.query('SELECT * FROM products', function (error, results, fields) {
//     if (error) console.log('OH SHIT');
//     console.log(results);
//   });
// });
 
db.end();