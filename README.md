# OPTIMIZED CONTRACT LAWYER RAG

## Overview
This repository contains the implementation of a Retrieval Augmented Generation (RAG) system for Contract Q&A. In this project I aim to build, evaluate, and improve a RAG system capable of answering questions related to legal contracts autonomously. The system leverages Langchain, a leading LLM application framework, for development and evaluation. Fastapi for backend and React on the frontend.

## Objectives
- Build a RAG system for Contract Q&A using Langchain.
- Evaluate the performance of the RAG system using predefined metrics and benchmarks.
- Implement enhancements to optimize the Contract Q&A process.
- Interpret and report the findings, including incremental improvements achieved.

## Tasks
The project is structured into several tasks, including:
1. Literature Review and Trend Analysis
2. Understanding RAG Performance Metrics
3. Efficiency and Scalability Optimization
4. Personalization and Contextualization
5. Bias Reduction
6. Planning and Design of Q&A Pipeline
7. Development of Retrieval and Generation Components
8. Integration and Testing
9. Building a RAG Evaluation Pipeline
10. Optimization Ideas for Contract Q&A
11. Implementation of Enhancements
12. Interpretation & Reporting

## Dependencies
- Python 3.x
- Langchain framework
- TensorFlow or PyTorch
- langchain
- RAGAS
- TruLens
- Cohere API
- FastAPI

## How to setup
---

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:biniyam69/AI-Contract-Lawyer.git
   ```

2. **Create a New Virtual Environment:**
   ```bash
   python -m venv <env_name>
   ```
   Replace `<env_name>` with your desired environment name.

3. **Activate the Virtual Environment:**
   - For Windows:
     ```bash
     .\<env_name>\Scripts\activate
     ```
   - For macOS/Linux:
     ```bash
     source <env_name>/bin/activate
     ```

4. **Install Requirements:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the FastAPI Backend:**
   ```bash
   cd backend
   uvicorn app:api
   ```

6. **Install Node Dependencies and Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

7. **Access the Application:**
   - Open your browser and go to [http://localhost:3000/chat](http://localhost:3000/chat) to access the chat interface.

---


## Screenshots
![Screenshot from 2024-03-20 13-18-10](https://github.com/biniyam69/AI-Contract-Lawyer/assets/91191700/dc45d90a-19bc-4df6-9b56-7820e72c7a0c)

---

![lawyerbro](https://github.com/biniyam69/AI-Contract-Lawyer/assets/91191700/98d8baa7-ceaa-4b99-9b0c-de8b5f4fd4c0)


## Contributors
- [Biniyam Ajaw](https://github.com/biniyam69)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README template according to your project specifics and requirements. Ensure it provides clear instructions for setup, dependencies, and usage, as well as an overview of the project objectives and structure.
