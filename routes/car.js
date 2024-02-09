
const express = require('express');
const router = express.Router();
const Car = require('../models/car');

// 1.API to add a new car data and save in the database
router.post('/', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2.API to get all cars data and show the list
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3.API to search for cars based on features
router.get('/search', async (req, res) => {
  const { make, model, year, color, speed, fuelType, transmission, price, mileage, engineSize } = req.query;
  const query = {};
  if (make) query.make = make;
  if (model) query.model = model;
  if (year) query.year = year;
  if (color) query.color = color;
  if (speed) query.speed = speed;
  if (fuelType) query.fuelType = fuelType;
  if (transmission) query.transmission = transmission;
  if (price) query.price = price;
  if (mileage) query.mileage = mileage;
  if (engineSize) query.engineSize = engineSize;

  try {
    const cars = await Car.find(query);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//4. API to delete a car data
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
