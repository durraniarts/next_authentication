import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/db/dbconfig";

export async function GET(request: NextRequest) {
  try {
    await connect();
    const userId = await getDataFromToken(request);

    const user = await User.findById({ _id: userId }).select("-password");
    console.log(user);
    return NextResponse.json({ message: "User Found", user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
