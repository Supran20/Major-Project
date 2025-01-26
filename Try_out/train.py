import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import ElasticNet
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.neural_network import MLPRegressor
from sklearn.metrics import mean_squared_error
from sklearn.ensemble import VotingRegressor
import joblib

# Load the generated dataset
df = pd.read_csv("price_demand_dataset_cyclical_quantities.csv")

# Feature selection
X = df[["Product_ID", "Market_Price", "Base_Price"]]
y = df["Quantity_Demanded"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 1. Linear Regression with ElasticNet Regularization
elastic_net = ElasticNet(alpha=0.01, l1_ratio=0.5, max_iter=1000, random_state=42)
elastic_net.fit(X_train, y_train)
joblib.dump(elastic_net, "elastic_net_model.pkl")  # Save model

# 2. Random Forest Regressor
rf = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
rf.fit(X_train, y_train)
joblib.dump(rf, "random_forest_model.pkl")  # Save model

# 3. XGBoost Regressor
xgb = XGBRegressor(n_estimators=100, max_depth=5, learning_rate=0.1, random_state=42)
xgb.fit(X_train, y_train)
joblib.dump(xgb, "xgboost_model.pkl")  # Save model

# 4. MLP Regressor
mlp = MLPRegressor(hidden_layer_sizes=(100,), activation='relu', solver='adam', max_iter=1000, random_state=42)
mlp.fit(X_train, y_train)
joblib.dump(mlp, "mlp_model.pkl")  # Save model

# 5. Ensemble of Regressors
ensemble = VotingRegressor([("elastic_net", elastic_net), ("rf", rf), ("xgb", xgb), ("mlp", mlp)])
ensemble.fit(X_train, y_train)
joblib.dump(ensemble, "ensemble_model.pkl")  # Save ensemble model

# Evaluate Ensemble Model
y_pred_ensemble = ensemble.predict(X_test)
mse_ensemble = mean_squared_error(y_test, y_pred_ensemble)
print(f"Ensemble Model MSE: {mse_ensemble}")

# 6. Using Saved Models to Predict
# Load saved models
loaded_elastic_net = joblib.load("elastic_net_model.pkl")
loaded_rf = joblib.load("random_forest_model.pkl")
loaded_xgb = joblib.load("xgboost_model.pkl")
loaded_mlp = joblib.load("mlp_model.pkl")
loaded_ensemble = joblib.load("ensemble_model.pkl")

# Sample data for prediction
sample_data = pd.DataFrame({
    "Product_ID": [1, 2, 3],
    "Market_Price": [1000, 2500, 3500],
    "Base_Price": [900, 2300, 3200]
})

# Make predictions using the saved ensemble model
sample_predictions = loaded_ensemble.predict(sample_data)
print("Predictions for Sample Data:", sample_predictions)
