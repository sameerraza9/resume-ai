const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate matches the job description based on the analysis of resume, self description and job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention behind asking the technical question"),
        answer: z.string().describe("how to anser this question, what points to cover, what approach to take etc.")
    })).describe("A list of technical questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them."),
    behaviouralQuestions: z.array(z.object({
        question: z.string().describe("The behavioural question can be asked in the interview"),
        intention: z.string().describe("The intention behind asking the behavioural question"),
        answer: z.string().describe("how to anser this question, what points to cover, what approach to take etc.")
    })).describe("A list of behavioural questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them."),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking based on the analysis of resume, self description and job description"),
        severity: z.enum(["Low", "Medium", "High"]).describe("The severity of the skill gap, whether it is low, medium or high")
    })).describe("A list of skill gaps that the candidate has based on the analysis of resume, self description and job description"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of the preparation for that day, e.g. data structures, system design, behavioural questions etc."),
        tasks: z.array(z.string()).describe("A list of tasks to be completed on that day for preparation")
    })).describe("A day-wise preparation plan for the candidate to prepare for the interview, based on the analysis of resume, self description and job description")
})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `You are an expert career coach. Your task is to generate an interview report for a candidate based on the analysis of the candidate's resume, self description and the job description of the role they are applying for. The interview report should include a list of technical questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them. It should also include a list of behavioural questions that can be asked in the interview, along with the intention behind asking those questions and how to answer them. Additionally, the report should identify any skill gaps that the candidate has based on the analysis of resume, self description and job description, and provide a day-wise preparation plan for the candidate to prepare for the interview, based on the analysis of resume, self description and job description. The preparation plan should include the main focus of preparation for each day, as well as a list of tasks to be completed on each day for preparation. Here is the information you have: \n\n Resume: ${resume} \n\n Self Description: ${selfDescription} \n\n Job Description: ${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema)
        }

    })

    return JSON.parse(response.text)
    

}


module.exports =  generateInterviewReport 