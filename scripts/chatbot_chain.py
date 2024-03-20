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

from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import CohereRerank
from langchain_community.llms import Cohere
from langchain_community.embeddings import CohereEmbeddings
from langchain.retrievers.document_compressors import EmbeddingsFilter
from trulens_eval import TruChain, Feedback, Tru

tru = Tru()
tru.reset_database()

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')
cohere_api_key = os.getenv('COHERE_API_KEY')

def preprocess_data():
    """Preprocesses the data for the chatbot chain."""

    loader = UnstructuredHTMLLoader('/home/biniyam/TenAcademy/AI-Contract-Lawyer/notebook/imdb_data/21_imdb.com.html')
    document = loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=512, chunk_overlap=0)
    docs = text_splitter.split_documents(documents=document)

    embedding_function = CohereEmbeddings(model="embed-english-light-v3.0")
    embedding_filter = EmbeddingsFilter(embeddings=embedding_function, similarity_threshold=0.75)
    db = Qdrant.from_documents(docs, embedding_function, location=":memory:", collection_name="imdb_data")

    retriever = db.as_retriever()
    compressor = CohereRerank(cohere_api_key=cohere_api_key)
    compression_retriever = ContextualCompressionRetriever(base_compressor=compressor, base_retriever=retriever, type="rerank")

    template = """You are a my personal private legal contract lawyer who know a lot of stuff about contracts.
            You are responsible for assisting the user based on their respective questions about a certain contract

    {context}

    Question: {question}
    Helpful answer:"""

    custom_rag_prompt = PromptTemplate.from_template(template)

    llm = Cohere(temperature=0)  # Using Cohere as the LLM

    rag_chain = (
        {"context": compression_retriever, "question": RunnablePassthrough()}
        | custom_rag_prompt
        | llm
        | StrOutputParser()
    )

    return rag_chain

def generate_response(query, rag_chain):
    """Generates a response using the preprocessed data and returns the LLM's text output."""

    response_text = ""
    for chunk in rag_chain.stream(query):
        response_text += chunk

    return response_text
