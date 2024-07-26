const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 80;

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
console.log(process.env.API_KEY)
app.use(cors());
app.get('/health-check', async (req, res) => {
    res.status(200).send({message:'ok'})
})
// Define a route
app.get('/get-response', async (req, res) => {
    const { question } = req.query;
    console.log('User has asked a question', question);
    const response = await getResponse(question);
    res.send(response);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
