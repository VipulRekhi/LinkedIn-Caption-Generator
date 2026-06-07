import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.port;

//API SETTING
const key = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
    apiKey: key,
});

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.post("/caption", async (req,res)=>
{

    var user_statement = req.body.prompt;
    try{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a LinkedIn caption generator . Return ONLY the final caption dont use stars in final caption no bold text. Never explain your reasoning, approach, or formatting choices. Never include introductory text such as "This is an intriguing request" or similar. Transform the user's ordinary daily-life event into an absurdly professional LinkedIn success post dont use hard english keep proessional words but keep it easy to understand to normal person while being proffesional. The humor must come from treating a trivial event as a meaningful achievement while remaining completely sincere. Use enthusiastic LinkedIn-style language, emojis, professional-sounding sections, bullet points, lessons learned, challenges, insights, and a call-to-action. Preserve the original event exactly, but exaggerate its significance. Avoid sarcasm, memes, philosophy, mindfulness, or technology references unless the event itself involves technology. Make it look like a post that would receive hundreds of LinkedIn reactions despite being about almost nothing. Output only the caption. USER INPUT: ${user_statement}`,
    });
    console.log(response.text);
    res.send(response.text);
    }
    catch(err)
    {
        console.log(err);
        res.redirect("/")
    }

});
app.listen(port, () => {
    console.log("app is running");
})
