import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HUGGING_FACE_TOKEN);

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  try {
    const chatCompletion = await client.chatCompletion({
      provider: "auto",
      model: "HuggingFaceH4/zephyr-7b-beta",
      messages: [
        { role: "system", content: "Answer as concisely as possible." },
        { role: "user", content: message },
      ],
      max_tokens: 60,
    });

    return NextResponse.json({
      text: chatCompletion.choices?.[0]?.message?.content || "No response",
    });
  } catch (error: unknown) {
    console.error("Hugging Face SDK Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Unknown error" },
      { status: 500 }
    );
  }
}
