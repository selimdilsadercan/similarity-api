import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";
import { CreateApiData } from "@/types/api-key";

////

export async function GET() {
  try {
    //authantication control
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json<CreateApiData>(
        { error: "Unauthanticated", createdApiKey: null },
        { status: 401 },
      );
    }

    ////

    //api key control
    const existingApiKey = await db.apiKey.findFirst({
      where: { userId, enabled: true },
    });

    if (existingApiKey) {
      return NextResponse.json<CreateApiData>(
        { error: "You already have a valid API key.", createdApiKey: null },
        { status: 400 },
      );
    }

    ////

    //prisma
    const createdApiKey = await db.apiKey.create({
      data: {
        userId,
        key: nanoid(32),
      },
    });
    return NextResponse.json<CreateApiData>(
      { error: null, createdApiKey },
      { status: 200 },
    );

    ////
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json<CreateApiData>(
        { error: error.issues, createdApiKey: null },
        { status: 400 },
      );
    }

    return NextResponse.json<CreateApiData>(
      { error: "Internal Server Error", createdApiKey: null },
      { status: 500 },
    );
  }
}
