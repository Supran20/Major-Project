# Import Libraries
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt

# Step 1: Load the Dataset
data = pd.read_csv("updated_data_cleaned_with_date_columns.csv")

# Display the first few rows
print("First few rows of the dataset:")
print(data.head())

# Step 2: Ensure Quantity is Present
if "Quantity" not in data.columns:
    raise ValueError("Ensure the Quantity column exists in the dataset!")

# Step 3: Prepare Data for Modeling
# Remove non-predictive columns and set up features and target
X = data.drop(["Quantity", "Order Date"], axis=1, errors="ignore")  # Remove non-relevant columns
y = data["Quantity"]

# Handle categorical data (if any) by one-hot encoding
X = pd.get_dummies(X, drop_first=True)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Train a Random Forest Regressor
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# Predict and evaluate
y_pred = rf.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse}")

# Step 5: Extract Feature Importance
importances = rf.feature_importances_
feature_names = X.columns

# Create a DataFrame for better readability
importance_df = pd.DataFrame({
    "Feature": feature_names,
    "Importance": importances
}).sort_values(by="Importance", ascending=False)

# Print the feature importance
print("\nFeature Importance:")
print(importance_df)

# Step 6: Visualize Feature Importance
plt.figure(figsize=(10, 6))
plt.barh(importance_df["Feature"], importance_df["Importance"], color="skyblue")
plt.xlabel("Feature Importance")
plt.ylabel("Features")
plt.title("Feature Importance for Quantity")
plt.gca().invert_yaxis()  # Invert y-axis for better readability
plt.show()

# Step 7: Optional - SHAP for Detailed Insights
# Uncomment the following section if SHAP is installed for deeper insights
"""
import shap
explainer = shap.TreeExplainer(rf)
shap_values = explainer.shap_values(X_test)

# SHAP summary plot
shap.summary_plot(shap_values, X_test)
"""
