const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyA4cYmr9rV9e5fT3b9bbz2tEWiexklrBtE"
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});




// const openai = initializeOpenAI();

// function initializeOpenAI() {
//   try {
//     const apiKey = process.env.OPENAI_API_KEY;
//     if (!apiKey) {
//       throw new Error('OpenAI API key is not set.');
//     }
//     return new OpenAI({
//       apiKey: apiKey,
//     });
//   } catch (error) {
//     console.error('Error initializing OpenAI:', error);
//     return undefined;
//   }
// }

module.exports = {
  async createFlashCards(req, res) {
    try {
      if (!req.body.title || !req.body.front || !req.body.back || !req.body.cardCount) {
        return res.status(400).json({ message: 'Missing info for deck creation.' });
      }
      
      const systemMessage = `You are a teacher who makes flash card decks for students. Return flash cards with JSON parameters (front:string, back:string).`;
      // const userMessage = `Using '${req.body.front}' as a front side card example and '${req.body.back}' as back side card example, create ${req.body.cardCount} flash cards. Ensure all cards fit under the classification of '${req.body.title}'.`;
      const prompt = `Using '${req.body.front}' as a front side card example and '${req.body.back}' as back side card example, create ${req.body.cardCount} flash cards. Ensure all cards fit under the classification of '${req.body.title}'.`;

      const result = await model.generateContent(systemMessage + prompt);
      const response = await result.response;
      const text = response.text();

      // const completion = await openai.chat.completions.create({
      //   messages: [{ role: 'system', content: systemMessage }, { role: 'user', content: userMessage }],
      //   model: 'gpt-3.5-turbo',
      // });

      // const jObj = JSON.parse(completion.choices[0].message.content);
      return res.status(200).json({data:JSON.parse(text.match(/json\s*(\[[\s\S]*\])/)[1])});

    } catch (error) {
      console.error('Error creating flashcards:', error);
      return res.status(500).json({ message: 'Internal server error.' });
      
    }
  },

  async createCards(title, frontText, backText, cardCount) {
    try {
      const systemMessage = `You are a teacher who makes flash card decks for students. Return flash cards with JSON parameters (frontText:string, backText:string).`;
      const userMessage = `Using '${frontText}' as a frontText card example and '${backText}' as backText card example, create ${cardCount} flash cards. Ensure all cards fit under the classification of '${title}'.`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: systemMessage }, { role: 'user', content: userMessage }],
        model: 'gpt-3.5-turbo',
      });

      const jObj = JSON.parse(completion.choices[0].message.content);
      return jObj;

    } catch (error) {
      console.error('Error creating cards:', error);
      return { message: 'Internal server error.' };
    }
  }
};