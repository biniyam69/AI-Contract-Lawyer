import openai
from openai import OpenAI
import os, sys
import requests, dotenv
from dotenv import load_dotenv
from langchain_community.vectorstores import Qdrant
from langchain_community.document_loaders import UnstructuredHTMLLoader
from langchain_openai import OpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.runnables import RunnableParallel, RunnablePassthrough
from langchain.text_splitter import CharacterTextSplitter
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')

client = OpenAI(api_key=api_key)


def setup_chatbot_chain(query: str) -> str:
    loader = UnstructuredHTMLLoader('/home/biniyam/TenAcademy/AI-Contract-Lawyer/notebook/imdb_data/21_imdb.com.html')
    document = loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=512, chunk_overlap=0)
    docs = text_splitter.split_documents(documents=document)
    embedding_function = OpenAIEmbeddings(model='text-embedding-3-large')
    db = Qdrant.from_documents(docs, embedding_function, location=":memory:", collection_name="imdb_data")
    
    retriever = db.as_retriever()
    
    template = """You are a my personal private legal contract lawyer who know a lot of stuff about contracts.
            You are responsible for assisting the user based on their respective questions about a certain contract
 
    {context}
    
    Question: {question}
    Helpful answer:"""
    
    custom_rag_prompt = PromptTemplate.from_template(template)
    
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

    rag_chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | custom_rag_prompt
        | llm
        | StrOutputParser()
    )
    
    for chunk in rag_chain.stream(query):
        print(chunk, end="", flush=True)
    
    
    