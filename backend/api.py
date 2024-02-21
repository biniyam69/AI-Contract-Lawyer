from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List
import supabase

app = FastAPI()

UserModel = BaseModel(
    "UserModel",
    {
        "name": str,
        "email": str,
        "password": str,
    },
)

# sign up

@app.post("/signup")
async def signup(user: User):
    user = jsonable_encoder(user)
    return JSONResponse(content=user)

@app.post("/login")
async def signin(user: User, email: str, password: str):
    res = supabase.auth.sign_in({
        'email': email,
        'password': password
    })
    
    if res['error']:
        return JSONResponse(content={"error": res['error']})
    else:
        return JSONResponse(content={"access_token": res['access_token']})
    
@app.post("/logout")
async def logout():
    res = supabase.auth.sign_out()
    return JSONResponse(content={"message": "User logged out"})

@app.post("/forgot-password")
async def forgot_password(email: str):
    res = supabase.auth.api.reset_password_for_email(email)
    return JSONResponse(content={"message": "Password reset email sent"})

# if signup or signin:
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=["*"],
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )

@app.get("/")
async def root():
    return {"message": "Hello World"}
