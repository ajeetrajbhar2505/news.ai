const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.gemini_api_key);

exports.askQuestion = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await run(prompt);

        // Process the response to replace ** with <b> and end ** with </b> and \n with <br>
        const formattedResponse = extractNews(formatResponse(response));

        res.send({ status: 200, response: formattedResponse });
    } catch (error) {
        console.log(error);
        res.send({ status: 200, response: 'Cannot provide an answer for this question' });
    }
};

async function run(prompt) {
    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        // Add a check for safety-related error and throw it
        if (isSafetyError(error)) {
            throw new Error("SafetyError");
        } else {
            throw error;
        }
    }
}

// Example function to check if the error is related to safety concerns
function isSafetyError(error) {
    // Implement your logic to check if the error is related to safety concerns
    // For example, you might check the error message or error code here
    return error.message.includes("safety") || error.code === "SAFETY_CONCERN";
}

function formatResponse(response) {
    // Replace **text** with <b>text</b>
    let formattedResponse = response.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    
    // Replace \n with <br>
    formattedResponse = formattedResponse.replace(/\n/g, '<br>');
    formattedResponse = formattedResponse.replace(/\*/g, '');

    return formattedResponse;
}


function extractNews(response) {
    const newsPattern = /<b>Title:<\/b>\s*(.*?)<br><br><b>Description:<\/b>\s*(.*?)<br><br>/g;
    let matches;
    const newsArray = [];

    while ((matches = newsPattern.exec(response)) !== null) {
        const title = matches[1].trim();
        const description = matches[2].trim();
        newsArray.push({ title, description });
    }

    return newsArray;
}