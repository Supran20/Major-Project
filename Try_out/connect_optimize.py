import pandas as pd
import joblib
import random
import time
from datetime import datetime, timedelta
from pymongo import MongoClient

# MongoDB connection
MONGODB_URI = "mongodb+srv://msupran17:supran@supran.afauf7y.mongodb.net/Admin01?retryWrites=true&w=majority&appName=Supran"
client = MongoClient(MONGODB_URI)
db = client["Admin01"]

# Load model
ensemble_model = joblib.load("ensemble_model.pkl")

# Product details for each collection
products = {
    "raybanvioletgun": {"Product_ID": 7, "Base_Price": 500, "Market_Price": 1500},
    "cateyesunglasses": {"Product_ID": 8, "Base_Price": 700, "Market_Price": 1100},
    "classicaviatorshades": {"Product_ID": 7, "Base_Price": 200, "Market_Price": 1000},
    "elitegoldsportshades": {"Product_ID": 6, "Base_Price": 4500, "Market_Price": 6000},
    "roundbrownsunglasses": {"Product_ID": 5, "Base_Price": 1400, "Market_Price": 2000},
    "steampunkeclipseshades": {"Product_ID": 4, "Base_Price": 500, "Market_Price": 1400},
    "oakleyrainbowsportsglasses": {"Product_ID": 3, "Base_Price": 1600, "Market_Price": 3000},
    "squaredesignerframes": {"Product_ID": 2, "Base_Price": 1300, "Market_Price": 1530},
    "raybanblackpolarizedsunglasses": {"Product_ID": 1, "Base_Price": 700, "Market_Price": 900},
    "roundmetalsunglasses": {"Product_ID": 3, "Base_Price": 1600, "Market_Price": 3000}
}

# Function to calculate optimized price
def calculate_optimized_price(product_id, market_price, date):
    date_obj = datetime.strptime(date, "%Y-%m-%d")
    day, month, year = date_obj.day, date_obj.month, date_obj.year

    adjustments = [0, 0.05, 0.10, 0.15, 0.20]
    results = pd.DataFrame(columns=["Adjusted_Price", "Predicted_Quantity", "Revenue", "Adjustment_Percentage"])

    for adjustment in adjustments:
        for direction in [1, -1]:
            adjusted_price = int(market_price * (1 + direction * adjustment))  # Convert to integer
            input_data = pd.DataFrame({
                'Product_ID': [product_id],
                'Market_Price': [adjusted_price],
                'Day': [day],
                'Month': [month],
                'Year': [year]
            })

            predicted_quantity = max(1, int(ensemble_model.predict(input_data)[0]))  # Ensure at least 1 piece sold
            revenue = adjusted_price * predicted_quantity

            new_row = pd.DataFrame({
                "Adjusted_Price": [adjusted_price],
                "Predicted_Quantity": [predicted_quantity],
                "Revenue": [revenue],
                "Adjustment_Percentage": [direction * adjustment * 100]
            })
            results = pd.concat([results, new_row], ignore_index=True)

    optimal_row = results.loc[results["Revenue"].idxmax()]
    return int(optimal_row["Adjusted_Price"]), optimal_row["Predicted_Quantity"]

# Insert new entry every 20 seconds for all collections
day_count = 0
start_date = datetime(2025, 2, 9)

while day_count < 10:
    timestamp = start_date + timedelta(days=day_count)

    for collection_name, details in products.items():
        collection = db[collection_name]
        stock = random.randint(0, 100)
        no_of_reviewers = random.randint(1, 200)

        optimized_price, predicted_pieces_sold = calculate_optimized_price(
            details["Product_ID"], details["Market_Price"], timestamp.strftime("%Y-%m-%d")
        )

        # Adjust price based on stock level
        if stock < 10:
            optimized_price = int(optimized_price * 0.85)  # Reduce by 15%
        elif 10 <= stock < 30:
            optimized_price = int(optimized_price * 0.90)  # Reduce by 10%
        elif 50 <= stock < 80:
            optimized_price = int(optimized_price * 1.00)  # No change
        elif 80 <= stock < 90:
            optimized_price = int(optimized_price * 1.10)  # Increase by 10%
        else:
            optimized_price = int(optimized_price * 1.15)  # Increase by 15%

        entry = {
            "Product_ID": details["Product_ID"],
            "Stock": stock,
            "No_of_Reviewers": no_of_reviewers,
            "Pieces_sold": predicted_pieces_sold,
            "Base_Price": details["Base_Price"],
            "Market_Price": optimized_price,
            "Timestamp": timestamp
        }

        collection.insert_one(entry)
        print(f"Inserted into {collection_name}: {entry}")

        # Update market price for next iteration
        details["Market_Price"] = optimized_price

    day_count += 1
    time.sleep(20)  # Simulate a delay
