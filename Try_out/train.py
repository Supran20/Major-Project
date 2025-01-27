import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import ElasticNet
from sklearn.ensemble import RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.neural_network import MLPRegressor
from sklearn.ensemble import VotingRegressor
import joblib

# Load the generated dataset
df = pd.read_csv("generate_ml_2.csv")

# Convert 'Date' to datetime format
df["Date"] = pd.to_datetime(df["Date"], errors='coerce')

# Feature selection
X = df[["Product_ID", "Market_Price"]]  # Include Product_ID and Market_Price as features
y = df["Quantity"]  # The target is Quantity_Demanded

# Extracting features from 'Date' (e.g., day, month, year) using .loc to avoid SettingWithCopyWarning
X.loc[:, "Day"] = df["Date"].dt.day
X.loc[:, "Month"] = df["Date"].dt.month
X.loc[:, "Year"] = df["Date"].dt.year

# Drop the original 'Date' column from df before using it
df = df.drop(columns=["Date"])

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
