import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# Load dataset
df = pd.read_csv("generate_ml_2.csv")  # Replace with actual dataset

# Feature selection
df['Date'] = pd.to_datetime(df['Date'])
df['Year'] = df['Date'].dt.year
df['Month'] = df['Date'].dt.month
df['Day'] = df['Date'].dt.day

# Selecting input features and target variable
X = df[['Product_ID', 'Market_Price', 'Year', 'Month', 'Day']]
y = df['Quantity']

# Splitting data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Extracting coefficients
b0 = model.intercept_
b_values = model.coef_

# Displaying the regression equation
feature_names = X.columns
equation = f"Y = {b0:.2f} "
for i, coef in enumerate(b_values):
    equation += f"+ ({coef:.2f} * {feature_names[i]}) "

print("\nOptimal values of coefficients:")
print(f"Intercept (b0): {b0:.2f}")
for i, coef in enumerate(b_values):
    print(f"b{i+1} (for {feature_names[i]}): {coef:.2f}")

print("\nRegression Equation:")
print(equation)

# Model evaluation
mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print("\nModel Performance:")
print(f"Mean Squared Error (MSE): {mse:.2f}")
print(f"Mean Absolute Error (MAE): {mae:.2f}")
print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
print(f"R-squared (R²): {r2:.2f}")
