import { useState, useRef, useEffect } from 'react';

const botResponses = {
  'hi': 'Hello! Welcome to AapnaMakhana.com \u{1F44F} How can I help you today?',
  'hello': 'Hey there! \u{1F60A} I\'m here to help you with orders, products, or any questions. What\'s up?',
  'help': 'I can help you with:\n\u{2022} Product recommendations\n\u{2022} Order tracking\n\u{2022} Shipping info\n\u{2022} Returns & refunds\n\u{2022} Payment options\n\nJust ask me anything!',
  'order': 'To track your order, go to **My Account > Orders** after logging in. You\'ll see real-time status updates there. Need help with something specific?',
  'shipping': 'We offer FREE shipping on all orders above \u20B9499! Standard delivery takes 2-4 business days across India. \u{1F69A}',
  'return': 'We have a 7-day return policy. If you\'re not satisfied, just raise a return request from your order page and we\'ll arrange a pickup. Full refund guaranteed! \u{2705}',
  'payment': 'We accept all payment methods:\n\u{2022} UPI (GPay, PhonePe, Paytm)\n\u{2022} Credit/Debit Cards\n\u{2022} Net Banking\n\u{2022} Cash on Delivery\n\nAll payments are 100% secure! \u{1F512}',
  'price': 'Our makhana starts from just \u20B9149! We have options for every budget. Check out our Shop page for all products. \u{1F4B5}',
  'makhana': 'Makhana (Fox Nuts) are a superfood! They\'re:\n\u{2022} High in protein\n\u{2022} Low in calories\n\u{2022} Rich in antioxidants\n\u{2022} Gluten-free\n\nPerfect for healthy snacking! \u{1F33F}',
  'organic': 'Our Organic Makhana range is 100% chemical-free, sourced directly from Bihar farms. It\'s our premium line - try it! \u{1F33F}',
  'gift': 'Check out our Gift Packs starting from \u20B9229! Perfect for festivals, birthdays, or just to surprise someone. \u{1F381}',
  'offer': 'Great question! Right now we offer:\n\u{2022} FREE shipping above \u20B9499\n\u{2022} 10% OFF on first order\n\u{2022} Combo deals available\n\nVisit our Shop page for current prices!',
  'thanks': 'You\'re welcome! \u{1F60A} Is there anything else I can help you with?',
  'thank': 'Happy to help! \u{2764}\u{FE0F} Let me know if you need anything else.',
  'bye': 'Goodbye! Happy snacking! \u{1F95C}\u{1F44B} Come back anytime.',
};

function getResponse(input) {
  const lower = input.toLowerCase().trim();
  for (const [key, val] of Object.entries(botResponses)) {
    if (lower.includes(key)) return val;
  }
  if (lower.match(/^(hi|hey|yo|hii|helloo)/)) return botResponses['hi'];
  if (lower.match(/thank|thx/)) return botResponses['thanks'];
  if (lower.match(/bye|tata|see you/)) return botResponses['bye'];
  return 'Thanks for your message! \u{1F60A} I can help with product info, orders, shipping, and payments. Could you be more specific so I can assist you better?';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! \u{1F44B} Welcome to AapnaMakhana. I\'m your virtual assistant. How can I help you today?', sender: 'bot', time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEnd = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), text: input.trim(), sender: 'user', time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, text: getResponse(userMsg.text), sender: 'bot', time: new Date() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const quickReplies = [
    { label: 'Track Order', msg: 'How to track my order?' },
    { label: 'Shipping Info', msg: 'What are the shipping charges?' },
    { label: 'Payment Options', msg: 'What payment methods do you accept?' },
    { label: 'Return Policy', msg: 'What is the return policy?' }
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isOpen ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
          border: 'none',
          color: 'white',
          fontSize: isOpen ? '1.4rem' : '1.6rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 5000,
          boxShadow: isOpen ? 'none' : '0 6px 24px rgba(255,107,53,0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isOpen ? 'rotate(0deg)' : 'none'
        }}
        title={isOpen ? 'Close chat' : 'Chat with us'}
      >
        {isOpen ? '\u2715' : '\u{1F4AC}'}
      </button>

      {/* Notification dot */}
      {!isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '42px',
          right: '42px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#10B981',
          border: '2px solid var(--bg-primary)',
          zIndex: 5001,
          animation: 'pulse 2s infinite'
        }} />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          width: '400px',
          maxWidth: 'calc(100vw - 48px)',
          height: '560px',
          maxHeight: 'calc(100vh - 140px)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 5000,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          animation: 'fadeInUp 0.3s ease'
        }}>
          {/* Header */}
          <div style={{
            padding: '18px 20px',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              {'\u{1F95C}'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', fontSize: '1rem' }}>AapnaMakhana Support</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                Online &bull; Usually replies instantly
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.sender === 'user'
                    ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))'
                    : 'rgba(255,255,255,0.06)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border)',
                  color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-line',
                  wordBreak: 'break-word'
                }}>
                  {msg.text}
                </div>
                <div style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                  padding: '0 4px'
                }}>
                  {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '4px', padding: '8px 16px', width: 'fit-content' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--text-muted)', animation: 'pulse 1s infinite 0s' }} />
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--text-muted)', animation: 'pulse 1s infinite 0.2s' }} />
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--text-muted)', animation: 'pulse 1s infinite 0.4s' }} />
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div style={{
              padding: '8px 16px',
              display: 'flex',
              gap: '6px',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--border)'
            }}>
              {quickReplies.map((qr, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(qr.msg); setTimeout(sendMessage, 0); }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: 'rgba(255,107,53,0.08)',
                    border: '1px solid rgba(255,107,53,0.2)',
                    color: 'var(--primary-light)',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '14px 16px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                borderRadius: '24px',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: input.trim() ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))' : 'rgba(255,255,255,0.05)',
                border: 'none',
                color: 'white',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                opacity: input.trim() ? 1 : 0.4
              }}
            >
              {'\u27A4'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
