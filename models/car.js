
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  color: String,
  speed: Number,
  fuelType: String,
  transmission: String,
  price: Number,
  mileage: Number,
  engineSize: Number,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
