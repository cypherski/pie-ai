const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable assistant specializing in π (pi). Provide accurate, engaging responses about π's mathematical properties, history, and applications."
        },
        { role: "user", content: message }
      ],
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE),
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS)
    });

    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});