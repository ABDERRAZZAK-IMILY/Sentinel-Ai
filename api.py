from flask import Flask, request, jsonify
import joblib

model = joblib.load('sentinel_model.joblib')
vectorizer = joblib.load('sentinel_vectorizer.joblib')

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    message = data.get('message')
    message_vector = vectorizer.transform([message])
    prediction = model.predict(message_vector)
    result = 'Phishing Email' if prediction[0] == 1 else 'Safe Email'
    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
