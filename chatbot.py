import streamlit as st
import os
import openai
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from trulens_eval import TruChain, Feedback, OpenAI, Huggingface, Tru
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import DirectoryLoader
from langchain_community.document_loaders import UnstructuredHTMLLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings.sentence_transformer import (
    SentenceTransformerEmbeddings,
)
from langchain_core.runnables import RunnableParallel, RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser



embeddings = OpenAIEmbeddings(model="text-embedding-3-large")

hugs = Huggingface()
openai = OpenAI()
tru = Tru()

os.environ["OPENAI_API_KEY"] = st.secrets["OPENAI_API_KEY"]

### Load Docs ###

loader = DirectoryLoader(path='/home/biniyam/TenAcademy/AI-Contract-Lawyer/notebook/imdb_data/', loader_cls=UnstructuredHTMLLoader)
docs = loader.load()

text_spliter = CharacterTextSplitter(chunk_size=512, chunk_overlap=0)
documents = text_spliter.split_documents(docs)

embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")


vectorstore = Chroma(docs, embedding_function=embedding_function)

retriever = vectorstore.as_retriever()





##### Chain #####

template = """You will answer the following questions based on the following context:
{context}

Question: {question}"""


    
prompt = PromptTemplate(input_variables=["context", "question"], template=template)

memory = ConversationBufferMemory(memory_key="chat_history", max_memory_length=10)
llm = ChatOpenAI(model_name="gpt-3.5-turbo")
chain = (RunnableParallel({"context": retriever, "question": RunnablePassthrough()})
                        | prompt
                        | llm
                        | StrOutputParser())

##### Evaluation #####

f_relevance = Feedback(openai.relevance).on_input_output()


f_hate = Feedback(openai.moderation_hate).on_output()
f_violent = Feedback(openai.moderation_violence, higher_is_better=False).on_output()
f_selfharmed = Feedback(openai.moderation_selfharm, higher_is_better=False).on_output()
f_malice = Feedback(openai.maliciousness_with_cot_reasons, higher_is_better=False).on_output()

chain_recorder = TruChain(
    chain, app_id='Simple RAG', feedbacks=[f_relevance, f_hate, f_violent, f_selfharmed, f_malice]
    
)




# Streamlit frontend
st.title("Contextual Chatbot")

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("What is up?"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        # Record with TruLens
        with chain_recorder as recording:
            full_response = chain.run(prompt)
        message_placeholder = st.empty()
        message_placeholder.markdown(full_response + "▌")
        message_placeholder.markdown(full_response)
    st.session_state.messages.append(
        {"role": "assistant", "content": full_response})
    
tru.run_dashboard(port=8502)