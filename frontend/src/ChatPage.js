import {React , useState, useEffect} from 'react';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    // Function for handling message submission

    const sendMessage = () => {
        if (inputText.trim() != '') {
            // Add message to the list of messages
            setMessages([...messages, {role: 'user', content: inputText}]);
            setInputText('');
        }
    };

    return(
        <div>
            <div style={{maxHeight: '400px',  overflowY: 'scroll'}}>
                {/* Render Messages */}
                {messages.map((message, index) => (
                    <div key={index} style={{textAlign: message.role === 'user' ? 'right' : 'left'}}>
                        {message.content}
                    </div>    
                ))}
            </div>
            {/* Input for messages */}
            <div>
                <input
                    type='text'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder='Type a message to your lawyer'
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;