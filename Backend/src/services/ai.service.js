const {GoogleGenAI} = require('@google/generative-ai');


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})