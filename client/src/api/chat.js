/* global process */
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const sendMessage = async message => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are a knowledgeable assistant specializing in π (pi). Provide accurate, engaging responses about π's mathematical properties, history, and applications.",
        },
        { role: 'user', content: message },
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(error.message);
  }
};
