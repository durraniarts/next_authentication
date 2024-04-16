import { connect } from "@/db/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
var jwt = require("jsonwebtoken");

export async function POST(request: NextRequest) {
  await connect();

  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // If password is correct
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
