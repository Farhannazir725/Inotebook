const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";
const  connectToMongo = ()=>{
 mongoose.connect(mongoURI,async ()=>{
  await console.log('Connected to MongoDb Server Succefully');
 })
}
module.exports = connectToMongo; 