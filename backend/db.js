const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";
const  connectToMongo = ()=>{
 mongoose.connect(mongoURI,async()=>{
 await console.log('Connected to MongoDb Server Succefully');
 })
}
module.exports = connectToMongo; 