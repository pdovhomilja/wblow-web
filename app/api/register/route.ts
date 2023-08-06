import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  //console.log(body, "body");

  const register = await axios.post(
    `${process.env.WBLOW_ADMIN_URL}/api/accounts/register`,
    body
  );
  //console.log(register, "register");
  return NextResponse.json({ message: "Hello World" });
}
