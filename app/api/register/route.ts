// /app/api/register/route.ts
import { NextResponse } from "next/server";
import { users } from "@/app/users";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body;

    // check if user exists
    if (users.find(u => u.email === email)) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // create user
    const newUser = { id: users[users.length - 1].id + 1, email, password };
    users.push(newUser);

    return NextResponse.json({ success: true });
}
