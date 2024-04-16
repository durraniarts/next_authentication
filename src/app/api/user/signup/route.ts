import { connect } from "@/db/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      // console.log(user);
      return NextResponse.json({ error: "Already Signed Up" }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // saving credentials to database
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
