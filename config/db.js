const mongoose = require('mongoose');

async function connectToDb(){
    try{
        await mongoose.connect(process.env.DB_URL, {});
        console.log("Connected to DB");
    }catch(err){
        console.error();
         console.log("Failed to connect to DB",err);
    }

}

module.exports = connectToDb ;