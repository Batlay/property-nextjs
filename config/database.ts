import mongoose from 'mongoose'


let connected = false

const connectDB = async () => {
  mongoose.set('strictQuery', true)

  // if the database is already connected, don't conenct again
  if (connected) {
    console.log('MongoDB is already connected');
    return
  }

  //Connect to MongoDB
  try {
    console.log(process.env.MONGO_DB_URI);
    await mongoose.connect(process.env.MONGO_DB_URI ?? '')
  } catch (error) {
    console.log(error);
  }
 }

 export default connectDB