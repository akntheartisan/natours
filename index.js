const fs = require('fs');
const express = require('express');
require ("dotenv").config();
const { log } = require('console');
const mongoose = require('mongoose');
const app = express();

const tourRoutes = require('./routes/tourRoutes');
// const userRoutes = require('./routes/userRoutes');

app.use(express.json());


app.use('/',tourRoutes);

// app.use('/api/v1/users',userRoutes);

mongoose
 .connect(process.env.MONGO_DB_URL)
 .then(()=>{
  app.listen(8000, () => {
    console.log('lisenting');
  });
 })
 .catch((err)=>console.log(err));