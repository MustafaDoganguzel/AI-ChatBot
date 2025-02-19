import { useState } from 'react';
import './App.css';
import useGemini from './hooks/useGemini';

function App() {
  const [userInput, setUserInput] = useState('');
  const { responses, loading, error, askAI } = useGemini();

  function handleChat(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    const { value } = event.target;
    setUserInput(value);
    askAI(prompt);
  }
  if (loading) return 'Loading..';
  if (error) return `${error} Error`;
  return (
    <div className="content">
      <div className="response-container">
        <div class="response-container">
          <div class="messageBalloon user">
            Tell me about san-francisco in 3 sentences. use bullet points and
            highlight important words.
          </div>
          <div class="messageBalloon assistant">
            <ul>
              <li>
                <strong>Iconic Landmark City:</strong> San Francisco is renowned
                for <strong>Golden Gate Bridge</strong>,{' '}
                <strong>Alcatraz Island</strong>, and steep{' '}
                <strong>cable cars</strong>.
              </li>
              <li>
                <strong>Vibrant Culture:</strong> A <strong>melting pot</strong>{' '}
                of diverse cultures, San Francisco boasts{' '}
                <strong>world-class museums</strong>,{' '}
                <strong>culinary delights</strong>, and a thriving{' '}
                <strong>LGBTQ+ community</strong>.
              </li>
              <li>
                <strong>Tech Hub:</strong> Home to{' '}
                <strong>Silicon Valley</strong>, San Francisco is a global
                center for <strong>innovation</strong> and technological
                advancements.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="input-container">
        <form onSubmit={handleChat}>
          <input name="user-input" onChange={handleChange} value={userInput} />
          <button>Ask</button>
        </form>
      </div>
    </div>
  );
}

export default App;
