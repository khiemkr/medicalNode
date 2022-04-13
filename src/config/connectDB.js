// const { Sequelize } = require('sequelize');

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('medicalbooking', 'root', null, {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false
// });


// let connectDB = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

// module.exports = connectDB;
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: "medicalbooking" 
});
connection.connect(function (err) {
    if (err) {
        console.log(err);
    };
    console.log('Database is connected successfully !');
});

module.exports = connection;