import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export default async function Page() {
  const session = await getServerSession(authOptions)
  return <>
    <h1>Dashboard</h1>
    <pre>{JSON.stringify(session, null, 2)}</pre>
  </>
}