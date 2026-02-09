from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
import os
import nltk

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

nltk.download('punkt_tab') # Required for TextBlob to tokenize text

@app.route("/analyze", methods=["POST"])
def analyze_sentiment():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    if polarity > 0:
        sentiment = "Positive 😊"
    elif polarity < 0:
        sentiment = "Negative 😞"
    else:
        sentiment = "Neutral 😐"

    return jsonify({
        "emotion": sentiment,
        "score": round(abs(polarity), 2)
    })

if __name__ == "__main__":
    # Use the port Render provides, or default to 5000 for local testing
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
