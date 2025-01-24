const mongoose=require('mongoose')
const connectDB=(url)=>{
    return mongoose.connect(url).then(() => {
        console.log("MongoDB connected successfully");
    }).catch(err => {
        console.log("MongoDB connection error: ", err);
    });
}
module.exports=connectDB

