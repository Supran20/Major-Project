import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error
import xgboost as xgb
from sklearn.neural_network import MLPRegressor
from keras.models import Sequential
from keras.layers import Dense, LSTM
import joblib
import warnings
import matplotlib.pyplot as plt

warnings.filterwarnings('ignore')

# Load dataset
data = pd.read_csv('updated_data_cleaned_with_date_columns.csv')

# Convert 'Order Date' to datetime
data['Order Date'] = pd.to_datetime(data['Order Date'])

# Extract date-related features
data['day'] = data['Order Date'].dt.day
data['month'] = data['Order Date'].dt.month
data['year'] = data['Order Date'].dt.year
data['weekday'] = data['Order Date'].dt.weekday

# Drop the original 'Order Date' column
data = data.drop(columns=['Order Date'])

# Drop 'Product_Id' as it's categorical and assumed to be preprocessed
data = data.drop(columns=['Product_Id'])

# Standardize column names
data.columns = data.columns.str.replace('7-Moving Avg', '7-Day Moving Avg')

# Separate features and target
X = data.drop(columns=['Quantity'])  # Features
y = data['Quantity']  # Target variable

# Save feature names
joblib.dump(X.columns.tolist(), 'scaler_features.pkl')  # Save the feature names

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
joblib.dump(scaler, 'scaler.pkl')  # Save scaler

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Initialize models
linear_regressor = LinearRegression()
random_forest = RandomForestRegressor(random_state=42)
xg_regressor = xgb.XGBRegressor(random_state=42)
mlp_regressor = MLPRegressor(hidden_layer_sizes=(100,), activation='relu', solver='adam', max_iter=1000, random_state=42)

# Train and evaluate Linear Regression
linear_regressor.fit(X_train, y_train)
y_pred_linear = linear_regressor.predict(X_test)
print("Linear Regression MSE:", mean_squared_error(y_test, y_pred_linear))

# Train and evaluate Random Forest
random_forest.fit(X_train, y_train)
y_pred_rf = random_forest.predict(X_test)
print("Random Forest MSE:", mean_squared_error(y_test, y_pred_rf))

# Train and evaluate XGBoost
xg_regressor.fit(X_train, y_train)
y_pred_xgb = xg_regressor.predict(X_test)
print("XGBoost MSE:", mean_squared_error(y_test, y_pred_xgb))

# Train and evaluate MLP Regressor
mlp_regressor.fit(X_train, y_train)
y_pred_mlp = mlp_regressor.predict(X_test)
print("MLP Regressor MSE:", mean_squared_error(y_test, y_pred_mlp))

# Ensemble predictions (average)
ensemble_predictions = np.mean([y_pred_linear, y_pred_rf, y_pred_xgb, y_pred_mlp], axis=0)
print("Ensemble Model MSE:", mean_squared_error(y_test, ensemble_predictions))

# LSTM Model
X_train_lstm = X_train.reshape((X_train.shape[0], 1, X_train.shape[1]))
X_test_lstm = X_test.reshape((X_test.shape[0], 1, X_test.shape[1]))

lstm_model = Sequential()
lstm_model.add(LSTM(units=50, activation='relu', input_shape=(X_train_lstm.shape[1], X_train_lstm.shape[2])))
lstm_model.add(Dense(1))
lstm_model.compile(optimizer='adam', loss='mean_squared_error')

# Train LSTM model
lstm_model.fit(X_train_lstm, y_train, epochs=100, batch_size=32, validation_data=(X_test_lstm, y_test))

# Predict using LSTM
y_pred_lstm = lstm_model.predict(X_test_lstm)
print("LSTM MSE:", mean_squared_error(y_test, y_pred_lstm))

# Save models
joblib.dump(linear_regressor, 'linear_regressor_model.pkl')
joblib.dump(random_forest, 'random_forest_model.pkl')
joblib.dump(xg_regressor, 'xgboost_model.pkl')
joblib.dump(mlp_regressor, 'mlp_regressor_model.pkl')
lstm_model.save('lstm_model.h5')

# Testing with sample input
sample_data = {
    "Visibility": 0.02,
    "Cart Count": 3,
    "Cumulative Sales": 1200,
    "7-Day Moving Avg": 150,
    "Sales Last 7 Days": 220,
    "Trend": 0.3,
    "Sort Rank": 2,
    "Interaction Score": 8.5,
    "Stars": 4.5,
    "Reviews Count": 200,
    "Base_Price": 350,
    "Market_Price": 500,
    "day": 15,
    "month": 5,
    "year": 2024,
    "weekday": 2,
}
sample_df = pd.DataFrame([sample_data])

# Ensure the sample input matches the feature set
expected_columns = joblib.load('scaler_features.pkl')
sample_df = sample_df.reindex(columns=expected_columns, fill_value=0)

# Scale sample data
sample_scaled = scaler.transform(sample_df)

# Predict using the trained models
linear_pred = linear_regressor.predict(sample_scaled)
rf_pred = random_forest.predict(sample_scaled)
xgb_pred = xg_regressor.predict(sample_scaled)
mlp_pred = mlp_regressor.predict(sample_scaled)
lstm_pred = lstm_model.predict(sample_scaled.reshape((sample_scaled.shape[0], 1, sample_scaled.shape[1])))

# Print predictions
print("Sample Linear Regression Prediction:", linear_pred[0])
print("Sample Random Forest Prediction:", rf_pred[0])
print("Sample XGBoost Prediction:", xgb_pred[0])
print("Sample MLP Prediction:", mlp_pred[0])
print("Sample LSTM Prediction:", lstm_pred[0][0])

# Ensemble prediction for the sample
ensemble_sample_pred = np.mean([linear_pred[0], rf_pred[0], xgb_pred[0], mlp_pred[0]])
print("Sample Ensemble Prediction:", ensemble_sample_pred)
