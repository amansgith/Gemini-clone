import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY= import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

const runChat= async (prompt)=> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
}

export default runChat;