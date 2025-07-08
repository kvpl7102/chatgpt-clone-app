import OpenAI from "openai";

export const configureOpenAI = () => {
  const openaiConfig = new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.OPENAI_ORGINAZATION_ID,
  });
  return openaiConfig;
};