import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const genAI = new GoogleGenerativeAI(
'AIzaSyD0kTKjaI_GmhwgVpnBGeoGgdApi7G78tI'
  );
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const [chat, setChat] = useState(null);

  const startChat = async () => {
    try {
      const newChat = model.startChat({
        history: responses.map((msg) => ({
          role: msg.role,
          parts: msg.content,
        })),
      });
      setChat(newChat);
      return newChat;
    } catch (error) {
      console.error('There is an error', error);
      setError(error);
      return null;
    }
  };

  const askBot = async (prompt) => {
    try {
      setIsLoading(true);
      setError(null);

      let currentChat = chat;
      if (!currentChat) {
        currentChat = await startChat();
      }

      const result = await currentChat.sendMessage(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      setError(error);
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  async function handleChat(event) {
    event.preventDefault();

    const newResponse = {
      role: 'user',
      content: userInput,
    };
    setResponses((prev) => [...prev, newResponse]);

    const botResponse = await askBot(userInput);

    if (botResponse) {
      const newAssistantMessage = {
        role: 'assistant',
        content: botResponse,
      };
      setResponses((prev) => [...prev, newAssistantMessage]);
    } else {
      const errorMessage = {
        role: 'assistant',
        content: "I'm sorry, an error occurred.",
      };
      setResponses((prev) => [...prev, errorMessage]);
    }
    setUserInput('');
  }

  function handleChange(event) {
    const { value } = event.target;
    setUserInput(value);
  }

  return (
    <div className="content">
      <div className="response-container">
        {responses.map((response, index) => (
          <div key={index} className={`responseBalloon ${response.role}`}>
            {response.role === 'assistant' ? (
              <ReactMarkdown>{response.content}</ReactMarkdown>
            ) : (
              response.content
            )}
          </div>
        ))}
        {isLoading && (
          <div className="responseBalloon assistant">Loading...</div>
        )}
        {error && (
          <div className="responseBalloon error">Error: {error.message}</div>
        )}
      </div>
      <div className="input-container">
        <form onSubmit={handleChat}>
          <input
            name="user-input"
            onChange={handleChange}
            value={userInput}
            placeholder="Write prompt..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !userInput.trim()}>
            {isLoading ? 'Sending...' : 'Ask'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;