import pytest
from scripts.chatbot_chain import setup_chatbot_chain

def test_setup_chatbot_chain():
    # test if the function returns a string
    assert type(setup_chatbot_chain("what is the contract about")) == str
    
    
test_setup_chatbot_chain()