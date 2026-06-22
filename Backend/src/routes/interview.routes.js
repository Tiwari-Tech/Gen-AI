const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controller');
const interviewRouter = express.Router();
const upload = require('../middlewares/file.middleware');


interviewRouter.post("/", authMiddleware.authUser, upload.single('resume'), interviewController.generateInterviewReportController);

    /**
     * @route POST /api/interview
     * @desc Generate new interview report on the basis of resume user self description,resume pdf and job description
     * @access Private
     * */






module.exports = interviewRouter;