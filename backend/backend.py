import ollama
import json
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# Load FAISS DB
DB_PATH = "vectorstore/db_faiss"
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db = FAISS.load_local(DB_PATH, embedding_model, allow_dangerous_deserialization=True)

def retrieve_context(query, k=3):
    """Retrieve top-k relevant chunks from FAISS"""
    docs = db.similarity_search(query, k=k)
    return "\n\n".join([doc.page_content for doc in docs])

def chat_with_cheerio(user_query):
    """Retrieve context, format the prompt, and send it to Ollama"""
    context = retrieve_context(user_query)

    # Construct the final prompt with retrieved context
    final_prompt = f"""### Retrieved Context:
{context}

### User Question:
{user_query}

### Response:
"""

    # Call Ollama with the final prompt
    response = ollama.chat(model="cheerio", messages=[{"role": "user", "content": final_prompt}])
    
    return response['message']['content']

# Example usage
if __name__ == "__main__":
    user_query = input("Ask Cheerio: ")
    response = chat_with_cheerio(user_query)
    print("\nCheerio:", response)
