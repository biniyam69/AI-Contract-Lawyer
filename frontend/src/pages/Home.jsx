import  { useState } from 'react';
import '../App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';

function Home() {

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

  setMessages([...messages, newMessage]);
  setIsTyping(true);

  try {
    const response = await axios.post('http://127.0.0.1:8000/chat', { 
      query: message,
    rag_chain: 'rag_chain' 
  });

  const LLMResponse = response.data.response;

  const newLLMMessage = {
    message: LLMResponse,
    direction: 'incoming',
    sender: "Cohere"
  };

  setMessages([...messages, newLLMMessage]);

  } catch (error) {
    console.error('Error fetching data:', error);
  }

  setIsTyping(false);
};


  return (
    <div className="App" style={{height:"90vh", margin:'auto'}}>
      <div style={{ position:"relative", height: "100%", width: "700px",margin:'auto', }}>
        <MainContainer style={{padding:"10px 5px", borderRadius:'10px',
      display:"flex", alignItems:'center', justifyContent:'center', margin:"auto" }}>
          <ChatContainer >       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Assistant is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message style={{textAlign:'left'}} key={i} model={message} />
              })}
            </MessageList>
            <MessageInput
            onSend={handleSend} 
              style={{ textAlign:"left" }}  
              placeholder="Type message here" 
             /> 
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default Home