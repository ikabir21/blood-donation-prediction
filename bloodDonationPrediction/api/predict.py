import pickle
import pandas as pd
import os


filename = '/api/model.pkl'
filepath = os.getcwd() + filename
print("hello: " + filepath)

with open(filepath, 'rb') as file:
        model = pickle.load(file)

def predict(input_data):

    loaded_model = model.named_steps['model']
    scaler = model.named_steps['scaler']
    print("input: ", input_data)
    df = pd.DataFrame([input_data], columns=['months_since_last_donation','num_donations', 'months_since_first_donation'])
    df['new_variable'] = df["months_since_first_donation"] - df["months_since_last_donation"]
    df_scaled = scaler.transform(df)
    prediction = loaded_model.predict_proba(df_scaled)
    print(prediction)
    return prediction