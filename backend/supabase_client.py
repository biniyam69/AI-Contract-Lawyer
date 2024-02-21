import os
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from supabase import create_client, Client

url: str = 'https://gyowcxxjadsfkyyjiccv.supabase.co'
key: str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5b3djeHhqYWRzZmt5eWppY2N2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0NjkwNDUsImV4cCI6MjAyNDA0NTA0NX0.iTi2bFhjDrncJ_cVzQiEdacY8GZcr5vgHC8f4UcFt-'
supabase: Client = create_client(url, key)

# CONNECT TO SUPABASE database
connection_string = "postgresql://postgres.gyowcxxjadsfkyyjiccv:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

# Create engine
engine = create_engine(connection_string)

