const fs = require('fs');
const express = require('express');
const { log } = require('console');
const app = express();

const tourRoutes = require('./routes/tourRoutes');
// const userRoutes = require('./routes/userRoutes');

app.use(express.json());


app.use('/',tourRoutes);

// app.use('/api/v1/users',userRoutes);

app.listen(8000, () => {
  console.log('lisenting');
});
