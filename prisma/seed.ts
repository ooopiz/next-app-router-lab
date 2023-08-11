import { PrismaClient } from '@prisma/client'
import sha256 from 'crypto-js/sha256';

const prisma = new PrismaClient()

async function main() {
  const passwordHash = sha256('pass123').toString();

  const user = await prisma.user.upsert({
    where: { name: 'admin' },
    update: { password: passwordHash },
    create: { name: 'admin', password: passwordHash },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })