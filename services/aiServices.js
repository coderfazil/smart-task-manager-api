const openAi = require('openai');

const client = new openAi(
    {
        apiKey: process.env.OPEN_ROUTER_API_KEY,
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
            "HTTP-Referer": "http://localhost:5000", // your app URL
            "X-Title": "Smart Task Manager App"
        }
    }
)
const maxAttempt = 2;

const validateAiData = (data) => {
    if(!data.summary || !Array.isArray(data.steps) || !data.estimatedEffort) {
       throw new Error(`Validation failed`);
    }
    return data;


}

const ensureCompleteJson = (text)=>{
    const open = (text.match(/{/g) || []).length;
    const close = (text.match(/}/g) || []).length;
    if (open > close) text += "}".repeat(open - close);
    return text;
}

const parseAndValidateAiData =  (data) => {

    const start = data.indexOf("{");
    const end = data.lastIndexOf("}")
    if(start === -1 ) {
        throw new Error("No JSON found in AI response");
    }
           // remove extra text from the data
           let jsonString = data.slice(start, end !== -1 ? end + 1 : data.length);
            jsonString = jsonString
            .replace(/(\w+):/g, '"$1":')   // quote keys
            .replace(/'/g, '"');           // single → double quotes
            jsonString = ensureCompleteJson(jsonString);
            const jsonData = JSON.parse(jsonString);
           return validateAiData(jsonData);


}

const mockSummary = (description)=>{
    return {
        summary: description.slice(0, 50) + "...",
        steps: ["Review task", "Break into smaller steps", "Execute"],
        estimatedEffort: "medium",
    }
}


const summarizeTask = async (description)=>{
console.log(description)
    if(!description || description.trim().length < 5){
        return {
            success: false,
            message:"Description too short for AI processing!"
        }
    }
    const prompt = `
    You are a productivity assistant.

Rewrite the task description clearly and structured.


STRICT RULES:
- Return ONLY valid JSON
- Do NOT explain reasoning
- Do NOT include text outside JSON
- Do NOT include markdown

JSON format:

{
  "summary": "short one-line summary",
  "steps": ["step 1", "step 2"],
  "estimatedEffort": "low | medium | high"
}

Task description:
${description} `;

        for (let attempt = 1; attempt <= maxAttempt ; attempt++){
            try {

                // const response = await client.chat.completions.create({
                //     model: process.env.OPEN_ROUTER_MODEL,
                //     messages: [{role: "user", content: prompt}],
                //     temperature: 0.1,
                //     max_tokens: 300,
                // });
               const response = undefined;
                if(!response || !response.choices[0] || !response.choices[0].message.content) {
                    throw new Error("Empty response content");
                }

                    const rawData = response.choices[0].message.content;




                const parsedData = parseAndValidateAiData(rawData);
                    return {
                        success: true,
                        message: "Successfully completed task description",
                        data: parsedData,
                    }

            }catch(err) {
                console.error(`Attempt {${attempt}} of {${maxAttempt}} failed: ${err.message}` );
                if(attempt === maxAttempt) {
                    console.log(`Returning Mock Summary! `);
                    return {
                        success: true,
                        message: err.message,
                        source:"mock",
                        data : mockSummary(description)
                    }
                }

            }
        }


}

module.exports = {
    summarizeTask,
}