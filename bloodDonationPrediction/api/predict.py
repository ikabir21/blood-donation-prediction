import pickle
import pandas as pd
import os
from datetime import datetime


filename = '/api/model.pkl'
filepath = os.getcwd() + filename

with open(filepath, 'rb') as file:
        model = pickle.load(file)

def predict(input_data):

        first_donation_date = datetime.strptime(input_data[0], '%Y-%m-%d').date()
        today = datetime.now().date()
        last_donation_date = datetime.strptime(input_data[1], '%Y-%m-%d').date()
        num_donations = int(input_data[2])

        today = datetime.now().date()

        months_since_first_donation = (today.year - first_donation_date.year) * 12 + (today.month - first_donation_date.month)

        months_since_last_donation = (today.year - last_donation_date.year) * 12 + (today.month - last_donation_date.month)

        loaded_model = model.named_steps['model']
        scaler = model.named_steps['scaler']

        df = pd.DataFrame([[months_since_last_donation, num_donations, months_since_first_donation]], columns=['months_since_last_donation','num_donations', 'months_since_first_donation'])
        df['new_variable'] = df["months_since_first_donation"] - df["months_since_last_donation"]
        df_scaled = scaler.transform(df)
        prediction = loaded_model.predict_proba(df_scaled)
        return prediction