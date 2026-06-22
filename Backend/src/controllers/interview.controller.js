const pdfParse = require('pdf-parse');
const {generateInterviewReport} = require('../services/ai.service');
const interviewReportModel = require('../models/interviewReport.model');

async function generateInterviewReportController(req, res) {

    async function generateInterviewReportController(req, res) {
    console.log("req.user:", req.user);        // ADD THIS
    console.log("req.cookies:", req.cookies);  // ADD THIS

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const resumeText = resumeContent.text.slice(0, 2000); // Limit to first 1000 characters for logging
    const {selfDescription, jobDescription} = req.body;

    const interViewReoprtByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user._id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReoprtByAi
    });

    res.status(201).json({
        message: "Interview report generated successfully",
    });

}}





module.exports = {generateInterviewReportController};