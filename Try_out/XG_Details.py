import numpy as np
import pandas as pd
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
import joblib

# Load dataset
df = pd.read_csv("generate_ml_2.csv")

# Convert 'Date' to datetime and extract features
df["Date"] = pd.to_datetime(df["Date"], errors='coerce')
df["Day"] = df["Date"].dt.day
df["Month"] = df["Date"].dt.month
df["Year"] = df["Date"].dt.year
df = df.drop(columns=["Date"])  # Drop original Date column

# Feature selection
X = df[["Product_ID", "Market_Price", "Day", "Month", "Year"]]
y = df["Quantity"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize XGBoost model
xgb = XGBRegressor(
    n_estimators=100,     # Number of boosting rounds
    max_depth=5,          # Max depth of each tree
    learning_rate=0.1,    # Step size shrinkage
    random_state=42       # Seed for reproducibility
)

# Initial Gradient Calculation (Residuals)
y_pred_initial = np.full_like(y_train, np.mean(y_train))  # Initial prediction as mean
gradients_initial = y_train - y_pred_initial
print("Initial Gradients (First 10 values):", gradients_initial[:10].values)

# Train the model
xgb.fit(X_train, y_train)

# Final Gradient Calculation after training
y_pred_final = xgb.predict(X_train)
gradients_final = y_train - y_pred_final
print("Final Gradients (First 10 values):", gradients_final[:10].values)

# Evaluate Model Accuracy
y_test_pred = xgb.predict(X_test)
r2 = r2_score(y_test, y_test_pred)
print(f"Model Accuracy (R2 Score): {r2:.4f}")

# Save trained model
joblib.dump(xgb, "xgboost_model.pkl")

print("XGBoost model trained and saved successfully!")
