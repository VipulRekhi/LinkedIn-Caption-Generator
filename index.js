import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
//API SETTING
const key= process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: key,
});

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "who is prime minister of india",
});

console.log(response.text);
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port=process.env.port;
app.get("/",(req,res)=>
{
    res.send("hello from server");
});
app.listen(port,()=>
{
    console.log("app is running");
})
