const mongoose = require('mongoose');

const connectDB = async() =>{{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB is connect to the host : ${mongoose.connection.host}`)
    }catch(error){
        console.log('MongoDB connection error',error)
    }
}};

module.exports = connectDB