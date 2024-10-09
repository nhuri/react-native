const mongoose = require('mongoose');



const connection = async() =>{

    let url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/master";

    try {
        
        await mongoose.connect(url,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            /* useCreateIndex: true, */
            autoIndex: true,
        });

        console.log("mongoose connected to DB");

    } catch (error) {
        console.log(error);
    }
};


module.exports = connection;