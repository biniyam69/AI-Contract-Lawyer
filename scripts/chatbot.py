import os, sys
from chatbot_ui import run_chatbot_ui
from chatbot_chain import setup_chatbot_chain

def main():
    chain = setup_chatbot_chain()
    run_chatbot_ui(chain)
    
if __name__ == "__main__":
    main()