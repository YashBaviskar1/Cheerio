from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import requests
@api_view(['POST'])
def signup(request):
    data = request.data
    
    # Check if user already exists
    if User.objects.filter(email=data["email"]).exists():
        return Response({"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Create user (storing Full Name in first_name)
    user = User.objects.create_user(
        username=data["email"],  # Using email as username
        email=data["email"],
        password=data["password"],
        first_name=data["full_name"]
    )
    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data["email"], password=request.data["password"])
    if user:
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_details(request, email):
    try:
        user = User.objects.get(email=email)
        return Response({"full_name": user.first_name}, status=200)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
import requests
import ollama
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

# Load FAISS DB
DB_PATH = "../vectorstore/db_faiss"
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db = FAISS.load_local(DB_PATH, embedding_model, allow_dangerous_deserialization=True)

def retrieve_context(query, k=3):
    """Retrieve top-k relevant chunks from FAISS"""
    docs = db.similarity_search(query, k=k)
    return "\n\n".join([doc.page_content for doc in docs])
from django.http import StreamingHttpResponse
import json

@api_view(['POST'])
def chat(request):
    prompt = request.data.get("prompt", "")
    if not prompt:
        return Response({"error": "Prompt is required"}, status=400)
    
    # Retrieve relevant context
    context = retrieve_context(prompt)
    
    final_prompt = f"""### Retrieved Context:
{context}

### User Question:
{prompt}

### Response:
"""

    def stream_response():
        # Stream from Ollama with streaming enabled
        for chunk in ollama.chat(
            model="cheerio",
            messages=[{"role": "user", "content": final_prompt}],
            stream=True  # Enable streaming mode
        ):
            yield json.dumps({"response": chunk["message"]["content"]}) + "\n"

    return StreamingHttpResponse(stream_response(), content_type="application/x-ndjson")