import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer

data = pd.read_csv('data/emails.csv')

print(data.head())
print(data['Email Type'].value_counts())

X = data['Email Text']
y = data['Email Type']

X = X.dropna()
y = y[X.index]

le = LabelEncoder()
y_encoded = le.fit_transform(y)

vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)
X_vectors = vectorizer.fit_transform(X)



from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score

X_train, X_test, y_train, y_test = train_test_split(
    X_vectors, y_encoded, test_size=0.2, random_state=42
)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred, target_names=le.classes_))



import joblib

joblib.dump(model, 'sentinel_model.joblib')
joblib.dump(vectorizer, 'sentinel_vectorizer.joblib')

model_loaded = joblib.load('sentinel_model.joblib')
vectorizer_loaded = joblib.load('sentinel_vectorizer.joblib')
