import streamlit as st

def run_chatbot_ui(chain):
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
            # Run chatbot chain
            response = chain.run(prompt)
            st.markdown(response)
        st.session_state.messages.append(
            {"role": "assistant", "content": response})
