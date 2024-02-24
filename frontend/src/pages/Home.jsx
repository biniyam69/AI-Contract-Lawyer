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