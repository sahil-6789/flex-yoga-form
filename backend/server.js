require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cookieParser = require('cookie-parser')

//G4JoNrcs9GJTsnZG
// express app
const app = express();
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// middleware
app.use(express.json());

// app.use(express.urlencoded({extended:false}))


// route
app.use(cookieParser());
app.use('/', userRoutes);



// Set strictQuery to false
mongoose.set('strictQuery', false);
//WIcYBwbtvZ0Cl7xg
// connect to db
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listen for requests
    app.listen(5000, () => {
      console.log('Connected to db & listening on port 5000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
