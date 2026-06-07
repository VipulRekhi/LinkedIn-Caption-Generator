import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pg from "pg";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
// Database Configuration
const db = new pg.Client(
    {
        user: "postgres",
        host: "localhost",
        database: "captions",
        port: process.env.dbport,
        password: process.env.dbpass
    }
);
db.connect();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.port;

//API SETTING
const key = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
    apiKey: key,
});

//start page
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

//post Route
app.post("/caption", async (req, res) => {
    var user_statement = req.body.prompt;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a LinkedIn caption generator . Return ONLY the final caption dont use stars in final caption no bold text. Never explain your reasoning, approach, or formatting choices. Never include introductory text such as "This is an intriguing request" or similar. Transform the user's ordinary daily-life event into an absurdly professional LinkedIn success post dont use hard english keep proessional words but keep it easy to understand to normal person while being proffesional. The humor must come from treating a trivial event as a meaningful achievement while remaining completely sincere. Use enthusiastic LinkedIn-style language, emojis, professional-sounding sections, bullet points, lessons learned, challenges, insights, and a call-to-action. Preserve the original event exactly, but exaggerate its significance. Avoid sarcasm, memes, philosophy, mindfulness, or technology references unless the event itself involves technology. Make it look like a post that would receive hundreds of LinkedIn reactions despite being about almost nothing. Output only the caption. USER INPUT: ${user_statement}`,
        });
        console.log(response.text);
        res.send(response.text);
        await db.query("insert into captions(given_prompt,caption) values ($1,$2) ", [user_statement, response.text]);
    }
    catch (err) {

        console.error(err);

        if (err.status === 429) {
            return res.status(429).send(
                "API limit reached. Please try again later."
            );
        }

        res.status(500).send("Something went wrong.");

    }
});

//History Routing
app.post("/History", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM captions");

        res.json(result.rows);
        console.log(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
});
app.listen(port, () => {
    console.log("app is running");
})
