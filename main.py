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
