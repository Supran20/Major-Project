import pandas as pd
import numpy as np
from pymongo import MongoClient
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error
from statsmodels.tsa.arima.model import ARIMA

# Connect to MongoDB and fetch data
def fetch_data_from_mongodb():
    # Update with your MongoDB credentials
    client = MongoClient("mongodb://localhost:27017/")
    db = client["your_database_name"]
    collection = db["your_collection_name"]
    
    # Fetch data and convert it to a pandas DataFrame
    data = list(collection.find({}, {"Market_Price": 1, "Quantity": 1, "_id": 0}))
    df = pd.DataFrame(data)
    return df

# Prepare data
def preprocess_data(df):
    X = df[['Market_Price']].values
    y = df['Quantity'].values
    return train_test_split(X, y, test_size=0.2, random_state=42)

# Train Linear Regression model
def train_linear_regression(X_train, y_train):
    model = LinearRegression()
    model.fit(X_train, y_train)
    return model

# Train Random Forest model
def train_random_forest(X_train, y_train):
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model

# Train XGBoost model
def train_xgboost(X_train, y_train):
    model = XGBRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model

# Train ARIMA model
def train_arima(y_train):
    model = ARIMA(y_train, order=(1, 1, 1))
    arima_model = model.fit()
    return arima_model

# Ensemble predictions
def ensemble_predictions(models, X_test, arima_model, y_test):
    lr_model, rf_model, xgb_model = models
    predictions_lr = lr_model.predict(X_test)
    predictions_rf = rf_model.predict(X_test)
    predictions_xgb = xgb_model.predict(X_test)
    
    # Use ARIMA model's last prediction as a constant for simplicity
    arima_prediction = arima_model.forecast(steps=len(X_test))
    
    # Average predictions
    ensemble_pred = (predictions_lr + predictions_rf + predictions_xgb + arima_prediction) / 4
    mse = mean_squared_error(y_test, ensemble_pred)
    print(f"Ensemble Model MSE: {mse}")
    return ensemble_pred

# Main execution
def main():
    # Fetch data
    df = fetch_data_from_mongodb()
    print("Data fetched from MongoDB:", df.head())

    # Preprocess data
    X_train, X_test, y_train, y_test = preprocess_data(df)

    # Train models
    lr_model = train_linear_regression(X_train, y_train)
    rf_model = train_random_forest(X_train, y_train)
    xgb_model = train_xgboost(X_train, y_train)
    arima_model = train_arima(y_train)

    # Ensemble predictions
    models = (lr_model, rf_model, xgb_model)
    predictions = ensemble_predictions(models, X_test, arima_model, y_test)

    print("Ensemble Predictions:", predictions)

if __name__ == "__main__":
    main()
