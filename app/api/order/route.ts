import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, description, budget } = body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Telegram credentials missing");
      // Still return success to user UI as per requirements, or handle gracefully
      return NextResponse.json({ success: true, message: "Dev mode: Telegram skipped" });
    }

    const message = `🔥 NEW ORDER (HUSHKORDIK)\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n💡 Project: ${description}\n💰 Budget: ${budget || "Not specified"}\n\n⏰ Time: ${new Date().toLocaleString()}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML"
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API Error:", errorData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json({ success: true }); // Still return success to user UI as per rules
  }
}
