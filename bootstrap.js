const express = require('express');
const app = express();
const port = 9000;

// Get File bootstrap.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/bootstrap.html');
});


// Get Library bootstrap
app.use("/bootstrap", express.static(__dirname + '/node_modules/bootstrap/dist'));

// Listen on port 9000
app.listen(port, () => {
    console.log(`Server is running on port 
        http://localhost:${port}`);
});
