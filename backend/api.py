from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List
import supabase
from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
import dotenv
import os
from dotenv import load_dotenv
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from scripts.chatbot_chain import preprocess_data, generate_response


load_dotenv()

url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_KEY')



supabase = supabase.create_client(url, key)



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class QueryModel(BaseModel):
    query: str

class ChatRequest(BaseModel):
    query: str
    rag_chain: str

# # sign up
# #supabase signup

# def signup(email: str, password: str):
#     res = supabase.auth.sign_up({
#       "email": '',
#       "password": '',
#     })

# @app.post("/signup")
# async def signupuser(user: UserModel):
#     res = supabase.auth.sign_up({
#       "email": user.email,
#       "password": user.password,
#     })
#     if res['error']:
#         return JSONResponse(content={"error": res['error']})
#     else:
#         return JSONResponse(content={"access_token": res['access_token']})
    
# def login(email: str, password: str):
#     res = supabase.auth.sign_in({
#         'email': email,
#         'password': password
#     })
#     if res['error']:
#         return JSONResponse(content={"error": res['error']})
#     else:
#         return JSONResponse(content={"access_token": res['access_token']})


# # Login
# @app.post("/login")
# async def loginuser(user: UserModel):
#     res = supabase.auth.sign_in({
#         'email': user.email,
#         'password': user.password
#     })
#     if res['error']:
#         return JSONResponse(content={"error": res['error']})
#     else:
#         return JSONResponse(content={"access_token": res['access_token']})
    

# # Logout  
# @app.post("/logout")
# async def logoutuser():
#     res = supabase.auth.sign_out()
#     return JSONResponse(content={"message": "User logged out"})

# @app.post("/forgot-password")
# async def forgot_password(email: str):
#     res = supabase.auth.api.reset_password_for_email(email)
#     return JSONResponse(content={"message": "Password reset email sent"})

# if signup or signin:
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=["*"],
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )

rag_chain = preprocess_data()

@app.post("/chat")
async def gen_response(chat_request: ChatRequest):
    """
    Generates a response using the preprocessed data and returns the LLM's text output.
    """
    rag_chain = preprocess_data()
    response_text = generate_response(chat_request.query, rag_chain=rag_chain)
    return {"response": response_text}
    
