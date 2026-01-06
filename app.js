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


//
// Syntax to create a route in Express:
// - app.get(path, code)
// - app.get("/contact", function(req, res, next) {})
//

//
// Some methods to send an http response:
// - res.send()
// - res.sendFile()
// - res.json()
//


// 
// Example of custom middleware functions
// 
function sayHello(req, res, next) {
    console.log("hello Express");
    next()
}

app.use(sayHello)



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

// GET /pizzas
app.get("/pizzas", function(req, res, next){
    res.json(pizzasArr)
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

