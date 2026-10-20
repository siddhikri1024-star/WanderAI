import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",").map((origin) => origin.trim());
app.use(cors({ origin: (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error("Origin not allowed by CORS"));
} }));
app.use(express.json({ limit: "30kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/plan", async (req, res) => {
  const { destination, days, budget, travelers, style, interests } = req.body || {};
  if (!destination || !String(destination).trim()) {
    return res.status(400).json({ error: "Please enter a destination." });
  }
  if (String(destination).trim().length > 120) {
    return res.status(400).json({ error: "Destination must be 120 characters or fewer." });
  }
  const parsedDays = Number(days ?? 3);
  const parsedTravelers = Number(travelers ?? 2);
  if (!Number.isInteger(parsedDays) || parsedDays < 1 || parsedDays > 14) {
    return res.status(400).json({ error: "Trip duration must be between 1 and 14 days." });
  }
  if (!Number.isInteger(parsedTravelers) || parsedTravelers < 1 || parsedTravelers > 10) {
    return res.status(400).json({ error: "Traveler count must be between 1 and 10." });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: "AI is not configured yet. Add OPENAI_API_KEY to your local .env file, or explore the sample itinerary."
    });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 45000, maxRetries: 1 });
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are WanderAI, a thoughtful travel planner. Return valid JSON only with this shape:
          {"title":"string","intro":"string","estimatedTotal":"string","tips":["string"],"days":[{"day":1,"theme":"string","items":[{"time":"Morning","title":"string","description":"string","type":"activity"}]}]}.
          Create practical, varied itinerary ideas. Never claim live availability or exact current prices. Mark costs as estimates and mention that travelers should verify opening hours, visa rules and bookings. Keep each day to 3-4 activities.`
        },
        {
          role: "user",
          content: `Plan a ${parsedDays}-day trip to ${String(destination).trim()} for ${parsedTravelers} traveler(s). Budget: ${String(budget || "flexible").slice(0, 80)}. Style: ${String(style || "balanced").slice(0, 80)}. Interests: ${(Array.isArray(interests) ? interests.slice(0, 8).map((item) => String(item).slice(0, 50)) : []).join(", ") || "local highlights, food, culture"}. Respond in English.`
        }
      ]
    });
    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("The AI returned an empty itinerary.");
    res.json(JSON.parse(content));
  } catch (error) {
    console.error("AI itinerary error:", error.message);
    res.status(500).json({ error: "Could not generate a trip right now. Please try again in a moment." });
  }
});

const port = process.env.PORT || 8787;
app.listen(port, () => console.log(`WanderAI API running on http://localhost:${port}`));
