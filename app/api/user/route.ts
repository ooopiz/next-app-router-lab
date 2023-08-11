import sha256 from 'crypto-js/sha256';
import logger from "@/utils/logger";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const r = await request.json();
  const { username, password } = r;

  if (!username || !password) {
    return NextResponse.json({}, { status: 400 });
  }

  const user = await prisma.user.findUnique({where: { name: username }})
  if (!user) {
    logger.info(`User no found: ${username}`)
    return NextResponse.json({}, { status: 401 });
  }
  if (sha256(password).toString() === user.password) {
    logger.info(`User login: ${username}`)
    return NextResponse.json(user);
  } else {
    logger.info(`User password mismatch: ${username}`)
    return NextResponse.json({}, { status: 401 });
  }
}