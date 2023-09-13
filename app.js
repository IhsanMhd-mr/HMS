const express = require('express');
const app = express();

const dotenv = require( 'dotenv');
dotenv.config() ;


const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');




// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//  API routes
// app.use('/devs', require('./routes/dev.js'));
// app.use('/projects', require('./routes/projects.js'));
app.use('/clients', require('./routes/clients.js'));

// const randomNo = async (req,res) =>  {
//   let X = Math.random()*10;
//   console.log(X)
// }
// app.use('/rand',randomNo);


// app.use('/rand', randNo);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });