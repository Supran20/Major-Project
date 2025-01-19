import numpy as np
import pandas as pd
import joblib
from keras.models import load_model

# Load pre-trained models
linear_regressor = joblib.load('linear_regressor_model.pkl')
random_forest = joblib.load('random_forest_model.pkl')
xg_regressor = joblib.load('xgboost_model.pkl')
mlp_regressor = joblib.load('mlp_regressor_model.pkl')
lstm_model = load_model('lstm_model.h5')

# Load scaler and feature names
scaler = joblib.load('scaler.pkl')
expected_columns = joblib.load('scaler_features.pkl')

# Drastically changed sample input data
sample_data = {
    "Visibility": 1064,  # Very high visibility
    "Cart Count": 1.4,    # High number of items in the cart
    "Cumulative Sales": 44,  # Large cumulative sales
    "7-Day Moving Avg": 14.7,   # Large moving average
    "Sales Last 7 Days": 37,  # Large recent sales
    "Trend": 1.71,       # Unusually high trend value
    "Sort Rank": 80,      # Top-ranked product
    "Interaction Score": 84,   # Very high interaction score
    "Stars": 3.11,        # Perfect rating
    "Reviews Count": 353,  # High number of reviews
    "Base_Price": 912,  # High base price
    "Market_Price": 1594.4,  # High market price
    "day": 1,            # First day of the month
    "month": 3,         # December
    "year": 2023,        # Future year
    "weekday": 6,        # Sunday
}

# Convert sample data to a DataFrame
sample_df = pd.DataFrame([sample_data])

# Ensure the sample input matches the trained feature set
sample_df = sample_df.reindex(columns=expected_columns, fill_value=0)

# Scale the sample data
sample_scaled = scaler.transform(sample_df)

# Predict using pre-trained models
linear_pred = linear_regressor.predict(sample_scaled)
rf_pred = random_forest.predict(sample_scaled)
xgb_pred = xg_regressor.predict(sample_scaled)
mlp_pred = mlp_regressor.predict(sample_scaled)
lstm_pred = lstm_model.predict(sample_scaled.reshape((sample_scaled.shape[0], 1, sample_scaled.shape[1])))

# Display predictions
print("Sample Linear Regression Prediction:", linear_pred[0])
print("Sample Random Forest Prediction:", rf_pred[0])
print("Sample XGBoost Prediction:", xgb_pred[0])
print("Sample MLP Prediction:", mlp_pred[0])
print("Sample LSTM Prediction:", lstm_pred[0][0])

# Ensemble prediction
ensemble_sample_pred = np.mean([linear_pred[0], rf_pred[0], xgb_pred[0], mlp_pred[0]])
print("Sample Ensemble Prediction:", ensemble_sample_pred)
