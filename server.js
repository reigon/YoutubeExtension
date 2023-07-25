// Require necessary packages
const express = require('express');
const { getSubtitles } = require('youtube-captions-scraper');
const cors = require('cors');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Initialize express app
const app = express();
app.use(cors());
// Define port
const port = 3000;

app.get('/get-captions', async (req, res) => { // Added async here
  // Define video id and language
  const videoID = req.query.videoID || 'XXXXX';
  const lang = req.query.lang || 'fr';

  // Get captions
  try {
    const captions = await getSubtitles({
      videoID,
      lang
    });
    let concatenatedText = captions.map(item => item.text).join(' ');
    console.log(concatenatedText)
    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Please give the key points in the following: " + concatenatedText }],
      
    });
    // Send captions as response
    console.log('FINISHED')
    
    const completion_text = chat_completion.data.choices[0].message.content;
    let responseObject = { "concatenatedText": completion_text };
    let responseJson = JSON.stringify(responseObject);
    res.send(responseJson);
  } catch (error) {
    // Send error as response
    res.send(error);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
