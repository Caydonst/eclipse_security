import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { vaultItems } from "./vaultItems";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return new Response("Unauthorized", { status: 401 });
    }

    return Response.json(vaultItems);
}