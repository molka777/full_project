const express = require("express");
const connectDB = require('./config/dbConnect');
const user = require('./Routes/user')

const app = express();
app.use(express.json())
app.use('/user', user)
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, err => err ? console.log(err) : console.log(`server is running on PORT ${PORT}`)
);


