const mongoose = require('mongoose');

const DB_Connect = async(DB_NAME,DB_URL)=>{
    try {
        await mongoose.connect(DB_URL+DB_NAME)
        console.log("Database Connection Successfully Done !!!")
    } catch (error) {
        console.log("Database Connection Error:",error)
    }   
}
module.exports = DB_Connect