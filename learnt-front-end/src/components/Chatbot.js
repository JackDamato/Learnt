import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import '../styles/Chatbot.css';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      role: 'user',
      content: userInput,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');

    try {
      console.log('Sending request to Google Generative AI with:', userInput);
      const response = await model.generateContent(userInput);

      const aiMessage = {
        role: 'ai',
        content: response.response.text(),
      };
      console.log('Received response from Google Generative AI:', aiMessage);

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = {
        role: 'ai',
        content: 'Sorry, I couldn’t process your request at this time.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header" onClick={handleToggleChatbot}>
          Learn't TutorBot
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
        </div>
        <div className="chatbot-input-area">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <div className="chatbot-icon" onClick={handleToggleChatbot}>
        💬
      </div>
    </>
  );
};

export default Chatbot;
