const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
// const path = require('path');
const connectDB = require('./config/database');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const jobRoute = require('./routes/jobRoute');

dotenv.config()

// const _dirname = path.resolve()

const app = express()
connectDB()

app.use(express.json())
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));
app.use('/api/v1/job', jobRoute)
app.use('/api/v1/user', userRoute)


app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port : ${process.env.PORT}`)
})