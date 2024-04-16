import { NextRequest } from "next/server";
let jwt = require("jsonwebtoken");

export const getDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    const decoded: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
    return decoded.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
