import prisma from "@/utils/prisma";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const r = await request.json();
  const { username, password } = r;

  if (!username || !password) {
    return NextResponse.json({}, { status: 400 });
  }

  const user = await prisma.user.findUnique({where: { name: username }})
  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({}, { status: 401 });
  }
}