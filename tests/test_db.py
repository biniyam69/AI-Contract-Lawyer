import os, sys
import pytest
import sqlalchemy

# Add the path to the sys.path

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.supabase_client import create_engine, create_client

def test_create_engine():
    connection_string = "postgresql://postgres.gyowcxxjadsfkyyjiccv:Pleaseletmein11!.{}@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
    engine = create_engine(connection_string)
    assert isinstance(engine, sqlalchemy.engine.base.Engine)
    
test_create_engine()
                