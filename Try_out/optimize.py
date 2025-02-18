import pandas as pd
from datetime import datetime
import joblib

# Load the ensemble model
try:
    ensemble_model = joblib.load("ensemble_model.pkl")
    print(f"Loaded model type: {type(ensemble_model)}")
except Exception as e:
    print(f"Error loading model: {e}")
    raise

def calculate_optimized_price(product_id, market_price, date):
    # Convert date into day, month, and year
    date_obj = datetime.strptime(date, "%Y-%m-%d")
    day, month, year = date_obj.day, date_obj.month, date_obj.year

    # Adjustments to test
    adjustments = [0, 0.05, 0.10, 0.15, 0.20]
    results = pd.DataFrame(columns=["Adjusted_Price", "Predicted_Quantity", "Revenue", "Adjustment_Percentage"])

    for adjustment in adjustments:
        for direction in [1, -1]:
            # Calculate adjusted price based on the percentage adjustment
            adjusted_price = market_price * (1 + direction * adjustment)
            
            # Prepare input data for prediction
            input_data = pd.DataFrame({
                'Product_ID': [product_id],
                'Market_Price': [adjusted_price],
                'Day': [day],
                'Month': [month],
                'Year': [year]
            })

            # Predict quantity
            try:
                predicted_quantity = ensemble_model.predict(input_data)[0]
            except Exception as e:
                print(f"Error during prediction: {e}")
                raise

            # Calculate revenue
            revenue = adjusted_price * predicted_quantity
            
            # Record the adjustment percentage and corresponding details
            adjustment_percentage = direction * adjustment * 100  # Convert to percentage
            new_row = pd.DataFrame({
                "Adjusted_Price": [adjusted_price],
                "Predicted_Quantity": [predicted_quantity],
                "Revenue": [revenue],
                "Adjustment_Percentage": [adjustment_percentage]
            })

            results = pd.concat([results, new_row], ignore_index=True)

    # Display all the results for comparison
    print("\nPrice and Revenue Comparison:")
    print(results)

    # Find the optimal price based on highest revenue
    optimal_row = results.loc[results["Revenue"].idxmax()]
    
    print("\nOptimized Price Details:")
    print(f"Adjusted Price: {optimal_row['Adjusted_Price']:.2f}")
    print(f"Predicted Quantity: {optimal_row['Predicted_Quantity']:.2f}")
    print(f"Revenue: {optimal_row['Revenue']:.2f}")
    print(f"Adjustment Percentage: {optimal_row['Adjustment_Percentage']:.2f}%")

    return optimal_row["Adjusted_Price"]

# Example usage
try:
    optimized_price = calculate_optimized_price(product_id=3, market_price=3415, date="2025-01-22")
    print(f"\nOptimized Marked Price: {optimized_price:.2f}")
except Exception as e:
    print(f"An error occurred: {e}")
