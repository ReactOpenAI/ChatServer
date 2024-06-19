const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

require('dotenv').config();

const app = express();
const port = 4000; // You can change this to any port you prefer

const configuration = {
    apiKey: process.env.API_KEY,
};

const openAi = new OpenAI(configuration);

const getResponse = async (content) => {
    const response = await openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content },
        ],
        max_tokens: 100,
        temperature: 0.5,
    });
    return response.choices[0].message.content;
};

app.use(cors());

// Define a route
app.get('/', async (req, res) => {
    const { question } = req.query;
    console.log('User has asked a question', question);
    const response = await getResponse(question);
    res.send(response);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
