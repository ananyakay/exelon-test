
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const carRouter = require('./routes/car');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/car_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/cars', carRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
