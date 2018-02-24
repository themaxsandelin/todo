const express =  require('express');

const api = express();
api.listen(3000, ()=> {
    console.log("Api is running");
});

api.get('/', (req, res) => {
    res.send("hey");
});