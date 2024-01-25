// import mongoose, { Model } from "mongoose";

// // CONNECTING TO MONGOOSE (Get Database Url from .env.local)
// const { DATABASE_URL } = process.env;
// console.log("Mongoose Connection Established");

// (async ()=>{  const conn = await mongoose
//     .connect(DATABASE_URL as string)
//     .catch((err) => console.log(err));
//   console.log("Mongoose Connection Established");})()

// // connection function
// export const connect = async () => {


//   // OUR TODO SCHEMA
//   const TodoSchema = new mongoose.Schema(
//     {
//       item: String,
//       completed: Boolean,
//     },
//     { versionKey: false, timestamps: true }
//   );

//   const UserSchema = new mongoose.Schema(
//     {
//       name: String,
//       email: String,
//       password: String,
//       completed: Boolean,
//     },
//     { versionKey: false, timestamps: true }
//   );

//   // OUR TODO MODEL
//   const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

//   const User = mongoose.models.User || mongoose.model("User", UserSchema);

//   return { conn, Todo, User };
// };
