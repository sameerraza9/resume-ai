const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service.js")
const interviewReportModel = require("../models/interviewReports.model.js")

async function generateInterviewReportController(req,res) {
    const resumeFile = req.file
    const resumeContent  = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    const {selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        jobDescription,
        selfDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message:"interview Report Generated Successfully!",
        interviewReport
    })


}


module.exports = { generateInterviewReportController }

