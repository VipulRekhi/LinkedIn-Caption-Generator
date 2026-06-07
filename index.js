import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "captions",
    port: process.env.dbport,
    password: process.env.dbpass,
});
db.connect();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.port || 3000;

const key = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
    apiKey: key,
});

const CAPTION_PROMPT = (user_statement) =>
    `You are a LinkedIn caption generator . Return ONLY the final caption dont use stars in final caption no bold text. Never explain your reasoning, approach, or formatting choices. Never include introductory text such as "This is an intriguing request" or similar. Transform the user's ordinary daily-life event into an absurdly professional LinkedIn success post dont use hard english keep proessional words but keep it easy to understand to normal person while being proffesional. The humor must come from treating a trivial event as a meaningful achievement while remaining completely sincere. Use enthusiastic LinkedIn-style language, emojis, professional-sounding sections, bullet points, lessons learned, challenges, insights, and a call-to-action. Preserve the original event exactly, but exaggerate its significance. Avoid sarcasm, memes, philosophy, mindfulness, or technology references unless the event itself involves technology. Make it look like a post that would receive hundreds of LinkedIn reactions despite being about almost nothing. Output only the caption. USER INPUT: ${user_statement}`;

async function generateCaptionText(user_statement) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: CAPTION_PROMPT(user_statement),
    });
    return response.text;
}

app.post("/generate", async (req, res) => {
    const user_statement = req.body.prompt;

    if (!user_statement || !user_statement.trim()) {
        return res.status(400).json({ error: "Prompt is required." });
    }

    try {
        const caption = await generateCaptionText(user_statement);
        await db.query(
            "INSERT INTO captions(given_prompt, caption) VALUES ($1, $2)",
            [user_statement, caption]
        );
        res.json({ caption });
    } catch (err) {
        console.error(err);

        if (err.status === 429) {
            return res.status(429).json({ error: "API limit reached. Please try again later." });
        }

        res.status(500).json({ error: "Something went wrong." });
    }
});

app.get("/history", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT id, given_prompt, caption FROM captions ORDER BY id DESC"
        );

        const history = result.rows.map((row) => ({
            id: row.id,
            prompt: row.given_prompt,
            caption: row.caption,
            created_at: row.created_at ?? new Date().toISOString(),
        }));

        res.json(history);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
