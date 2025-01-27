import pandas as pd
import joblib
from pymongo import MongoClient
from urllib.parse import quote_plus
from datetime import datetime

# Encode username and password
username = quote_plus("msupran17")
password = quote_plus("supran@supran")

# Construct the connection string
connection_string = f"mongodb+srv://msupran17:supran@supran.afauf7y.mongodb.net/?retryWrites=true&w=majority&appName=Supran"

# Connect to the MongoDB cluster
client = MongoClient(connection_string)

# Specify the database and collections
db = client['Admin01']
cards_collection = db['cards']

# Load the ensemble model
ensemble_model = joblib.load("ensemble_model.pkl")

def calculate_best_price_and_update(document):
    try:
        # Extract required fields
        product_id = document.get('Product_ID', 0)
        market_price = float(document.get('Market_Price', 0))
        date = document.get('Date', "")

        # Generate adjusted market prices (± 0%, 5%, 10%, 15%, 20%)
        percentage_changes = [0, 5, 10, 15, 20]
        adjusted_prices = [market_price * (1 + pct / 100) for pct in percentage_changes] + \
                          [market_price * (1 - pct / 100) for pct in percentage_changes if pct != 0]

        # Convert Date into day, month, and year for the model input
        try:
            date_obj = datetime.strptime(date, "%m/%d/%Y")
            day, month, year = date_obj.day, date_obj.month, date_obj.year
        except ValueError:
            print(f"Invalid Date format for Product_ID {product_id}. Skipping this document.")
            return

        # Initialize variables to track the best price
        best_price = market_price
        best_revenue = 0
        best_adjustment = 0

        # Iterate over each adjusted price to calculate revenue
        for adjusted_price in adjusted_prices:
            # Prepare input data for the model
            input_data = pd.DataFrame({
                "Product_ID": [product_id],
                "Market_Price": [adjusted_price],
                "Day": [day],
                "Month": [month],
                "Year": [year]
            })

            # Predict quantity
            predicted_quantity = ensemble_model.predict(input_data)[0]

            # Calculate revenue
            revenue = adjusted_price * predicted_quantity

            # Print the adjustment details to the terminal
            adjustment_percentage = (adjusted_price - market_price) / market_price * 100
            print(f"Market Price: {adjusted_price:.2f}, Adjustment: {adjustment_percentage:.2f}%, Revenue: {revenue:.2f}")

            # Update the best price if current revenue is higher
            if revenue > best_revenue:
                best_revenue = revenue
                best_price = adjusted_price
                best_adjustment = adjustment_percentage

        # Round the best price to the nearest integer
        best_price_rounded = round(best_price)

        # Update the document in the database with the new market price
        cards_collection.update_one(
            {'_id': document['_id']},
            {"$set": {"new_Market_Price": best_price_rounded}}
        )
        print(f"Updated document ID {document['_id']} with new Market_Price: {best_price_rounded}, Revenue: {best_revenue:.2f}, Adjustment: {best_adjustment:.2f}%")

    except Exception as e:
        print(f"Error processing document ID {document['_id']}: {e}")

# Function to process all documents
def process_documents():
    print("Starting market price optimization...")

    # Retrieve all documents in the cards collection
    documents = cards_collection.find()

    for document in documents:
        calculate_best_price_and_update(document)

# Run the processing function
process_documents()
