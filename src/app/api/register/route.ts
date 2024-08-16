import { db } from "@/database/db";
import { users } from "@/database/schema/users";
import { genSaltSync, hashSync } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const salt = genSaltSync(17);
    const hashPassword = hashSync(password, salt);

    const user = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashPassword,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Account created Successfully",
        description: "Sign in to continue",
        user: user,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error.message);
    if (
      error.message ===
      "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: user.email"
    )
      return NextResponse.json(
        {
          message: "Internal Server Error",
          description: "Please try again later",
          user: null,
        },
        { status: 500 },
      );
  }
}
