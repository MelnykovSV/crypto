// import { NextResponse } from "next/server";
// import connectDB from "../lib/dbConnect";
// import { User1 } from "@/models";

// export async function GET(req: Request, context: any) {
//   // const catcher = (error: Error) => res.status(400).json({ error });
//   // const res = await fetch('https://data.mongodb-api.com/...', {
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //     'API-Key': process.env.DATA_API_KEY,
//   //   },
//   // })
//   // const data = await res.json()

//   const { Todo } = await connectDB();

//   const { params } = context;

//   const data = await Todo.find({});

//   return NextResponse.json({ data: data });
// }

// export async function POST(req: Request) {
//   // const res = await fetch('https://data.mongodb-api.com/...', {
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //     'API-Key': process.env.DATA_API_KEY,
//   //   },
//   // })
//   // const data = await res.json()

//    connectDB();

//    const user = await User.findOne({email:req.body.email})

//   console.log(req.body);

//   // await Todo.create({
//   //   item: "String",
//   //   completed: false,
//   // });

//   return NextResponse.json({ request: req.body },);
// }
