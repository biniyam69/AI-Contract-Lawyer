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

def setup_chatbot_chain():
    # Load documents
    loader = DirectoryLoader(path='/home/biniyam/TenAcademy/AI-Contract-Lawyer/notebook/imdb_data/', loader_cls=UnstructuredHTMLLoader)
    docs = loader.load()

    # Split documents into chunks
    text_splitter = CharacterTextSplitter(chunk_size=512, chunk_overlap=0)
    documents = text_splitter.split_documents(docs)

    # Setup embeddings
    embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    vectorstore = Chroma(docs, embedding_function=embedding_function)
    retriever = vectorstore.as_retriever()

    # Setup chatbot components
    template = """You will answer the following questions based on the following context:
    {context}

    Question: {question}"""

    prompt = PromptTemplate(input_variables=["context", "question"], template=template)
    llm = ChatOpenAI(model_name="gpt-3.5-turbo")

    # Define the chatbot chain
    chain = (RunnableParallel({"context": retriever, "question": RunnablePassthrough()})
             | prompt
             | llm
             | StrOutputParser())

    # Setup evaluation feedbacks
    f_relevance = Feedback(openai.relevance).on_input_output()
    f_hate = Feedback(openai.moderation_hate).on_output()
    f_violent = Feedback(openai.moderation_violence, higher_is_better=False).on_output()
    f_selfharmed = Feedback(openai.moderation_selfharm, higher_is_better=False).on_output()
    f_malice = Feedback(openai.maliciousness_with_cot_reasons, higher_is_better=False).on_output()

    # Setup TruChain for recording
    chain_recorder = TruChain(
        chain, app_id='Simple RAG', feedbacks=[f_relevance, f_hate, f_violent, f_selfharmed, f_malice]
    )

    return chain_recorder

# Example usage:
# chatbot_chain = setup_chatbot_chain()
