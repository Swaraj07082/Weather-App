const axios = require("axios");
const express = require("express");
const app = express();
const path = require("path");
const https = require("https");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))



app.get("/", (req, res) => {
//     ek app.get mai you can have only one res.send
 

res.sendFile(__dirname+"/frontend.html")


});

app.post('/' ,(req,res)=>{

// console.log("the request is received")
const query = req.body.cityName
const url =
`https://api.weatherapi.com/v1/current.json?key=2a51a8fc07c949dd9d5174333241001&q=${query}`;
https.get(url, (response) => {
// console.log(response);

// to use the fetched data from api we need to use .on function
response.on('data' , (data)=>{

    // console.log(data);
    const parseddata = JSON.parse(data);
    // console.log(parseddata)
    const temp = parseddata.current.temp_c  
    // console.log(temp)

    res.send(`The temp in ${query} is ${temp} `)

})
});

})

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
