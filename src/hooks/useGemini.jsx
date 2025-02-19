import { GoogleGenerativeAi } from '@google/generative-ai';
import { useState } from 'react';
import axios from 'axios';

const genAI = new GoogleGenerativeAi('AIzaSyD0kTKjaI_GmhwgVpnBGeoGgdApi7G78tI');

const result = await model.generateContent(prompt);

console.log(result.response.text());

export default function useGemini(modelName = 'gemini-1.5-flash') {
  const [responses, setResponses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const model = genAI.getGenerativeModel({ model: modelName });

  export const askAI = async (prompt) => {
    try {
      setLoading(false);
      setError(null);
      const result = await model.generateContent(prompt);
      setResponses(result.response.text());
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { responses, loading, error, askAI };
}
