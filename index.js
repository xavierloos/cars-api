const Joi = require('joi');
const express = require('express');
const app = express();

const importRangeRover = require('./Range_Rover.json') 
const importVolvo = require('./Volvo.json') 

app.use(express.json());

const cars = {
 "range_rover": importRangeRover,
 "volvo": importVolvo
 
}

app.get('/', (req, res) => {
 res.send(cars);
});

app.get('/api/cars', (req, res) => {
res.send(cars);
});

app.get('/api/cars/:brand', (req, res) => { 
 let brand = req.params.brand
 let model = req.query.model 
 if (!cars[brand]) return res.status(404).send("Invalid data")
 if (brand && model) return res.send(cars[brand][model])
 return res.send(cars[brand])
}) 

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listen on port ${port}...`))