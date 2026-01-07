const express = require("express")
const logger = require("morgan")

const pizzasArr = require("./data/pizzas.js")

const PORT = 3000

const app = express()

// Setup the request logger to run on each request
app.use(logger("dev"));

// Make the static files inside of the `public/` folder publicly accessible
app.use(express.static('public'));

// JSON middleware to parse incoming HTTP requests that contain JSON
app.use(express.json());




// GET /
app.get("/", function(req, res, next){
    console.log("we received a request for the HOMEPAGE")
    res.sendFile(__dirname + '/views/home.html');
})

// GET /contact
app.get("/contact", function(req, res, next){
    console.log("we received a request for the CONTACT page");
    res.sendFile(__dirname + '/views/contact.html')
})

// GET /pizzas -- all pizzas
// GET /pizzas?maxPrice=16 -- all pizzas with a max price of 16
app.get("/pizzas", function(req, res, next){

    let { maxPrice } = req.query

    // if maxPrice is undefined, return an array with all the pizzas
    if(maxPrice === undefined){
        res.json(pizzasArr)
        return;
    }

    // if we have maxPrice, then we return only the pizzas with that maxPrice
    const result = pizzasArr.filter(function (element, i, arr) {
        return element.price <= parseFloat(maxPrice);
    });
    
    res.json(result)
})


// GET /pizzas/:pizzaId
app.get("/pizzas/:pizzaId", function(req, res, next) {

    let { pizzaId } = req.params; // note: we get pizzaId as a string
    pizzaId = parseInt(pizzaId) // convert to an integer

    const result = pizzasArr.find(function (element, i, arr) {
        return element.id === pizzaId;
    });
    
    res.json(result)
})




app.listen(PORT, function(){
    console.log(`Server listening on port ${PORT}`);
})

