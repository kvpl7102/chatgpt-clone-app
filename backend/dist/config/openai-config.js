import OpenAI from "openai";
export const configureOpenAI = () => {
    if (!process.env.OPEN_AI_SECRET ||
        !process.env.OPENAI_ORGANIZATION_ID) {
        throw new Error("OpenAI API key or organization ID not configured");
    }
    const openaiConfig = new OpenAI({
        apiKey: process.env.OPENAI_SECRET,
        organization: process.env.OPENAI_ORGANIZATION_ID,
    });
    return openaiConfig;
};
//# sourceMappingURL=openai-config.js.map