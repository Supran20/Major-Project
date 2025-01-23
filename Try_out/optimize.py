import numpy as np
import pandas as pd
import random
from sklearn.ensemble import VotingRegressor
import joblib

# Load the saved ensemble model
ensemble_model = joblib.load("ensemble_model.pkl")

def calculate_random_optimized_price(date, product_id, market_price, base_price):
    # Percentage changes to apply to the market price
    percentage_changes = [0, 5, 10, 15, 20]
    adjusted_prices = [market_price * (1 + pct / 100) for pct in percentage_changes] + \
                      [market_price * (1 - pct / 100) for pct in percentage_changes if pct != 0]
    
    # Track corresponding percentage labels
    percentage_labels = [f"+{pct}%" for pct in percentage_changes] + \
                        [f"-{pct}%" for pct in percentage_changes if pct != 0]
    
    # Select a random index
    random_index = random.randint(0, len(adjusted_prices) - 1)
    random_price = adjusted_prices[random_index]
    random_label = percentage_labels[random_index]
    
    # Prepare input data for prediction
    input_data = pd.DataFrame({
        "Product_ID": [product_id],
        "Market_Price": [random_price],
        "Base_Price": [base_price]
    })

    # Predict quantity for the selected random price
    predicted_quantity = ensemble_model.predict(input_data)[0]

    # Calculate revenue
    revenue = random_price * predicted_quantity

    # Output the result
    print(f"Optimized Market Price: {random_price} ({random_label})")
    print(f"Predicted Quantity: {predicted_quantity}")
    print(f"Revenue: {revenue}")

# Example Usage
calculate_random_optimized_price(date="2025-01-22", product_id=1, market_price=1000, base_price=900)
