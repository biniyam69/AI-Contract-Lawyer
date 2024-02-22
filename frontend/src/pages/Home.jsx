// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const YourComponent = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("called")
//         const response = await axios.post('http://127.0.0.1:5000/api/v1/chat', { question: 'your-question' });
//         console.log(response);
//         const result = response.data.data.map(subList => {
//           // Check if the sub-list has at least three elements before removing the third one
//           if (subList.length >= 3) {
//             // Use slice to create a new array without the third element
//             return subList.slice(0, 2).concat(subList.slice(3));
//           }
//           return subList; // If the sub-list has less than three elements, leave it unchanged
//         });

//         setData(result); // Assuming the 'data' property contains the DataFrame JSON
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();

//   }, []);


  


//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Data Visualization</h2>
//       <div className="mb-8 xl:mb-16  max-w-[70rem] flex flex-col gap-8 md:gap-24  ">
//             <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Question
//                   </th>

//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Answer
//                   </th>

//                   {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Contexts
//                   </th> */}

//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Ground Truths
//                   </th>

//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Context Precision
//                   </th>

//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Context Recall
//                   </th>
                  
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Faithfulness
//                   </th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Answer Relevancy
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {data.map((prompt, index) => {
//                   return ( <tr key={index}>
//                      {
//                       prompt.map((value, value_index) => {
//                         return  <td key={value_index} className="px-6 py-4 ">
                      
//                       <div className="text-xs text-left text-gray-900">
//                         {value}
//                       </div>
//                       </td>
//                       })
//                      }
//                     </tr>
//                   )
//                 })}
//               </tbody>
//             </table>
//           </div>
//     </div>
//   );
// };

// export default YourComponent;


import  { useEffect, useRef, useState } from 'react';
import '../App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import PdfTextExtract from './PdfTextExtract';
import axios from 'axios';

// const API_KEY =  import.meta.env.VITE_REACT_APP_CHATGPT_API_KEY;


function Home() {

  const fileInputRef = useRef(null);
  const [text, setText] = useState('');
  const [prompt, setPrompt] = useState('');

 
  useEffect(() => {
    if(text){
      setPrompt(`
      Answer the following question based on the information in the provided text:
      ${text}
      `)
    }
    else{
      setPrompt("")
    }
  }, [text]);

  const handleButtonClick = () => {
    // Trigger the file input when the button is clicked
    fileInputRef.current.click();
  };



  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append('file', selectedFile);


    try {
      const response = await axios.post('http://127.0.0.1:5000/extract-text', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setText(response.data.data);
    } catch (error) {
      console.error(error);
    }

  };

  const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": prompt
  }
  


  const [messages, setMessages] = useState([
  
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


  
    const apiRequestBody = {
      "model": "gpt-4-1106-preview",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    console.log("apiRequestBody: ", apiRequestBody.messages)

        try {
          const response = await axios.post('http://127.0.0.1:5000/api/v1/chat', { message:apiRequestBody.messages});
          console.log(response);
          setMessages([...chatMessages, {
                message: response.data.data,
                sender: "ChatGPT"
              }]);
              setIsTyping(false);
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
  

    // await fetch('http://127.0.0.1:5000/api/v1/chat', 
    // {
    //   method: "POST",
    //   headers: {
    //     // "Authorization": "Bearer " + API_KEY,
    //     "Content-Type": "application/json"
    //   },
    //   body: {"question": apiRequestBody.messages}
    // }).then((data) => {
    //   return data.json();
    // }).then((data) => {
    //   console.log("data: ", data)
    //   setMessages([...chatMessages, {
    //     message: data.data.message,
    //     sender: "ChatGPT"
    //   }]);
    //   setIsTyping(false);
    // });
  }

  return (
    <div className="App" style={{height:"90vh", margin:'auto'}}>
      <div style={{ position:"relative", height: "100%", width: "700px",margin:'auto', }}>
      {/* <div style={{marginBottom:'10px'}}>
     <button onClick={handleButtonClick}>Select PDF File</button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
   </div> */}

        <MainContainer style={{padding:"10px 5px", borderRadius:'10px',
      display:"flex", alignItems:'center', justifyContent:'center', margin:"auto" }}>
          <ChatContainer >       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
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