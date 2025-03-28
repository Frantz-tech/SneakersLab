import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sneakerLab"),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    console.log("Database connexion successful !");
  } catch (error) {
    console.error("Database connexion failed !", error);
    process.exit(1);
  }
};

export default connectDb;
