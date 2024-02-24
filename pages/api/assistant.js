// pages/api/assistant.js
import { Configuration, OpenAIApi } from "openai";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003", // You can change the model as needed
        prompt: req.body.prompt,
        temperature: 0.7,
        max_tokens: 150,
      });
      res.status(200).json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
