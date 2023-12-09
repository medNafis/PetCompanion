const express = require('express'); //Importing the Express module
const app = express(); //Creating an instance of the Express module
const port = 3000; //Setting the port number to 3000

//Defining a route for the root path ("/")
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Starting the server and listening for requests on the specified port number
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});