import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/db/dbconfig";

export async function PATCH(request: NextRequest) {
  const req = await request.json();
  try {
    await connect();
    const userId = await getDataFromToken(request);

    const user = await User.updateOne(
      { _id: userId },
      { username: req.username }
    );
    console.log(user);
    return NextResponse.json({ message: "User Found", request });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
