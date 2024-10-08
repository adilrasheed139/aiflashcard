const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const API_KEY = "AIzaSyA4cYmr9rV9e5fT3b9bbz2tEWiexklrBtE";  // Directly included API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

module.exports = {
  async createFlashCards(req, res) {
    try {
      const { title, front, back, cardCount } = req.body;
      if (!title || !front || !back || !cardCount) {
        return res.status(400).json({ message: 'Missing info for deck creation.' });
      }

      const systemMessage = `You are a teacher who makes flash card decks for students. Return flash cards with JSON parameters (front:string, back:string).`;
      const prompt = `Using '${front}' as a front side card example and '${back}' as back side card example, create ${cardCount} flash cards. Ensure all cards fit under the classification of '${title}'.`;

      const result = await model.generateContent(systemMessage + prompt);
      const response = await result.response;
      const text = await response.text();  // Ensure text is properly awaited

      console.log('API Response:', text);  // Log the full response text

      const jsonMatch = text.match(/json\s*(\[\s*{[^]*?}\s*])/i);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[1]);
        return res.status(200).json({ data });
      } else {
        console.error('Failed to extract JSON from response:', text);
        return res.status(500).json({ message: 'Invalid JSON response' });
      }

    } catch (error) {
      console.error('Error creating flashcards:', error.message || error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  },

  async createCards(title, frontText, backText, cardCount) {
    try {
      const systemMessage = `You are a teacher who makes flash card decks for students. Return flash cards with JSON parameters (frontText:string, backText:string).`;
      const userMessage = `Using '${frontText}' as a frontText card example and '${backText}' as backText card example, create ${cardCount} flash cards. Ensure all cards fit under the classification of '${title}'.`;

      const result = await model.generateContent(systemMessage + userMessage);
      const response = await result.response;
      const text = await response.text();  // Ensure text is properly awaited

      console.log('API Response:', text);  // Log the full response text

      const jsonMatch = text.match(/json\s*(\[\s*{[^]*?}\s*])/i);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      } else {
        console.error('Failed to extract JSON from response:', text);
        return { message: 'Invalid JSON response' };
      }

    } catch (error) {
      console.error('Error creating cards:', error.message || error);
      return { message: 'Internal server error.' };
    }
  }
};
