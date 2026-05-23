const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({
        question: z.string().description("The technical question can be asked in the interview"),
        intention: z.string().description("The intention behind asking the technical question"),
        answer: z.string().description("how to anser this question, what points to cover, what approach to take etc.")
    })).description("A list of technical questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them."),
    behaviouralQuestions: z.array(z.object({
        question: z.string().description("The behavioural question can be asked in the interview"),
        intention: z.string().description("The intention behind asking the behavioural question"),
        answer: z.string().description("how to anser this question, what points to cover, what approach to take etc.")
    })).description("A list of behavioural questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them."),
    skillGaps: z.array(z.object({
        skill: z.string().description("The skill that the candidate is lacking based on the analysis of resume, self description and job description"),
        severity: z.enum(["Low", "Medium", "High"]).description("The severity of the skill gap, whether it is low, medium or high")
    })).description("A list of skill gaps that the candidate has based on the analysis of resume, self description and job description"),
    preparationPlan: z.array(z.object({
        day: z.number().description("The day number in the preparation plan, starting from 1"),
        focus: z.string().description("The main focus of the preparation for that day, e.g. data structures, system design, behavioural questions etc."),
        tasks: z.array(z.string()).description("A list of tasks to be completed on that day for preparation")
    })).description("A day-wise preparation plan for the candidate to prepare for the interview, based on the analysis of resume, self description and job description")
})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        content: "",
        
    })


}


module.exports =  generateInterviewReport 