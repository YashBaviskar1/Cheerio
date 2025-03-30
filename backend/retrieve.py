import sys
import json
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# Path to FAISS DB
DB_PATH = "vectorstore/db_faiss"

# Load FAISS index
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db = FAISS.load_local(DB_PATH, embedding_model)

def retrieve_context(query, k=3):
    """Retrieve top-k most relevant chunks from FAISS"""
    docs = db.similarity_search(query, k=k)
    return "\n\n".join([doc.page_content for doc in docs])

if __name__ == "__main__":
    # Read user input from Ollama
    user_query = sys.stdin.read().strip()
    
    # Retrieve relevant context
    context = retrieve_context(user_query)
    
    # Output JSON with context
    output = {
        "context": context,
        "user_query": user_query
    }
    
    print(json.dumps(output))  # Ollama will pass this to the model
