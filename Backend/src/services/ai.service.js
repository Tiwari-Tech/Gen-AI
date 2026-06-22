const {GoogleGenAI} = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    try {
        const prompt = `Generate an interview report for a candidate based on the following information:
        resume: ${resume.slice(0, 2000)}
        self description: ${selfDescription}
        job description: ${jobDescription}

        You MUST respond with ONLY a valid JSON object. No extra text, no markdown, no explanation.
        Keep it concise:
        - technicalQuestions: exactly 3 questions
        - behavioralQuestions: exactly 2 questions
        - skillGaps: maximum 5 gaps
        - preparationPlan: exactly 3 days

        The JSON must strictly follow this exact structure:
        {
            "matchScore": <number between 0-100>,
            "technicalQuestions": [
                {
                    "question": "<technical question>",
                    "intention": "<why interviewer asks this>",
                    "answer": "<how to answer it>"
                }
            ],
            "behavioralQuestions": [
                {
                    "question": "<behavioral question>",
                    "intention": "<why interviewer asks this>",
                    "answer": "<how to answer it>"
                }
            ],
            "skillGaps": [
                {
                    "skill": "<missing skill>",
                    "severity": "<low | medium | high>"
                }
            ],
            "preparationPlan": [
                {
                    "day": <day number>,
                    "focus": "<focus area>",
                    "task": "<specific task>"
                }
            ]
        }`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                maxOutputTokens: 1500
            }
        });

        const cleaned = response.text.replace(/```json|```/g, "").trim();
        return JSON.parse(cleaned);

    } catch (error) {
        console.error("❌ Error:", error);
    }
}

module.exports = {
    generateInterviewReport
}