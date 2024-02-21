import os
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.getenv('SUPABASE_URL')
key: str = os.getenv('SUPABASE_KEY')
supabase: Client = create_client(url, key)

# CONNECT TO SUPABASE database
connection_string = "postgresql://postgres.gyowcxxjadsfkyyjiccv:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# Create engine
engine = create_engine(connection_string)

