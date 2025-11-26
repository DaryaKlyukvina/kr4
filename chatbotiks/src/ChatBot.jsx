import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

function ChatBot() {
  const [messages, setMessages] = useState([
    { text: "Привет! Я простой бот. Спроси меня о чем-нибудь!", isBot: true, time: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { 
      text: inputText, 
      isBot: false, 
      time: new Date() 
    };
    setMessages([...messages, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Имитация ответа бота с задержкой
    setTimeout(() => {
      const botResponses = [
        "Интересный вопрос!",
        "Я еще учусь, спроси позже.",
        "Может, поговорим о чем-то другом?",
        "Извините, я не понимаю. Попробуйте переформулировать.",
        "Хм... Дайте подумать...",
        "Это хороший вопрос!",
        "Я бы с удовольствием ответил, но мои знания ограничены."
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { 
        text: randomResponse, 
        isBot: true, 
        time: new Date() 
      }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chat-bot">
      <h2>💬 Простой чат-бот</h2>
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>
              {message.text}
              <div className="message-time">
                {formatTime(message.time)}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="input-area">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Введите сообщение..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isTyping}
          />
          <button 
            onClick={sendMessage}
            disabled={isTyping || !inputText.trim()}
          >✓
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;