// Vercel serverless function — /api/chat
//
// Set GEMINI_API_KEY as an env var in this Vercel project's settings
// (NOT prefixed with VITE_, so it stays server-only and is never bundled
// into client code). Get a free key at https://aistudio.google.com/apikey
//
// Note: if you also have the Our Little World chatbot on another Vercel
// project, this is a SEPARATE project/deployment, so you need to add
// GEMINI_API_KEY here too (can reuse the same key value if you want).

const MODEL = "gemini-3.1-flash-lite"; // current stable free-tier model (Sept 2026)
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are a professional, friendly AI assistant embedded on Mac Kenny "Macky" G. Aleta's personal portfolio website. You answer questions from visitors — recruiters, hiring managers, potential clients, or curious visitors — about Macky's skills, projects, experience, and background.

Rules:
- Answer only using the information given in the CONTEXT below. If something isn't covered there, say honestly that you don't have that detail rather than guessing or inventing anything.
- Speak about Macky in the third person (he/his), as a knowledgeable assistant representing him — not as Macky himself.
- Keep a professional but warm and approachable tone, the way a well-prepared assistant would talk to a recruiter.
- Default to English since this is a portfolio for potential employers, but switch to Filipino/Taglish if the visitor writes in Filipino.
- Keep answers concise and scannable — short paragraphs or brief bullet points. Expand only if the visitor asks for more detail.
- If asked something unrelated to Macky's professional background (unrelated general knowledge, etc.), politely redirect back to what you can help with.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res
      .status(500)
      .json({ error: "GEMINI_API_KEY is not configured on the server." });
    return;
  }

  const { message, history, context } = req.body || {};

  if (!message || typeof message !== "string") {
    res
      .status(400)
      .json({ error: "Missing 'message' string in request body." });
    return;
  }

  const priorTurns = Array.isArray(history)
    ? history.map((turn) => ({
        role: turn.role === "model" ? "model" : "user",
        parts: [{ text: String(turn.text || "") }],
      }))
    : [];

  const contents = [
    ...priorTurns,
    { role: "user", parts: [{ text: message }] },
  ];

  const systemInstructionText = context
    ? `${SYSTEM_PROMPT}\n\n## CONTEXT\n\n${context}`
    : SYSTEM_PROMPT;

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstructionText }] },
        contents,
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 700,
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errText);
      res.status(502).json({ error: "Gemini API request failed." });
      return;
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || "")
        .join("") ||
      "Sorry, I don't have a response for that right now — try asking again.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat function error:", err);
    res.status(500).json({ error: "Something went wrong on the server." });
  }
}
