import { db } from "@/lib/db";
import { RevokeApiData } from "@/types/api-key";
import { auth } from "@clerk/nextjs";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST() {
  try {
    //authantication control
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json<RevokeApiData>(
        { error: "Unauthanticated", success: false },
        { status: 401 },
      );
    }

    ////

    //api key control
    const existingApiKey = await db.apiKey.findFirst({
      where: { userId, enabled: true },
    });

    if (!existingApiKey) {
      return NextResponse.json<RevokeApiData>(
        { error: "This API key could not be revoked.", success: false },
        { status: 500 },
      );
    }

    ////

    //invalidate API key
    await db.apiKey.update({
      where: {
        id: existingApiKey.id,
      },
      data: {
        enabled: false,
      },
    });
    return NextResponse.json<RevokeApiData>(
      { error: null, success: true },
      { status: 200 },
    );

    ////
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json<RevokeApiData>(
        { error: error.issues, success: false },
        { status: 400 },
      );
    }

    return NextResponse.json<RevokeApiData>(
      { error: "Internal Server Error", success: false },
      { status: 500 },
    );
  }
}
