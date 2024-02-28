import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { User } from "@/models";
import connectDB from "@/app/lib/dbConnect";
import { registerFormValidation } from "@/validation/registerFormValidation";
import { validate } from "@/validation/validation";

export async function POST(request: Request) {
  const { email, name, password } = await request.json();

  const errors = await validate(registerFormValidation, {
    email,
    name,
    password,
  });
  if (errors) {
    return NextResponse.json(
      { errors: errors || "unknown validation error" },
      { status: 400 }
    );
  }


  await connectDB();

  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return NextResponse.json(
      { message: "Email is already in use" },
      { status: 409 }
    );
  }
  const existingName = await User.findOne({ name });

  if (existingName) {
    return NextResponse.json(
      { message: "Name is already in use" },
      { status: 409 }
    );
  }

  try {
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "User is registered" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Internal server error" },
        {
          status: 500,
        }
      );
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        {
          status: 500,
        }
      );
    }
  }
}
