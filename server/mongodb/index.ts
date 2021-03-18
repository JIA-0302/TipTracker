import mongoose from "mongoose";

export default async () => {
  // Check for existing connection pool
  if (mongoose.connections[0].readyState) {
    return;
  }

  await mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB");
      throw err;
    });
};
