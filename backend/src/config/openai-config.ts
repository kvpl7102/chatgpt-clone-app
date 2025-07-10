import OpenAI from "openai";
export const configureOpenAI = () => {
  if (
    !process.env.OPENAI_API_KEY ||
    !process.env.OPENAI_ORGANIZATION_ID
  ) {
    throw new Error("OpenAI API key or organization ID not configured");
  }
  const openaiConfig = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION_ID,
  });
  return openaiConfig;
};