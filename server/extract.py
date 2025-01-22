import pandas as pd
import joblib
from pymongo import MongoClient
from urllib.parse import quote_plus

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
        base_price = float(document.get('Base_Price', 0))

        # Generate adjusted market prices (± 0%, 5%, 10%, 15%, 20%)
        percentage_changes = [0, 5, 10, 15, 20]
        adjusted_prices = [market_price * (1 + pct / 100) for pct in percentage_changes] + \
                          [market_price * (1 - pct / 100) for pct in percentage_changes if pct != 0]

        # Initialize variables to track the best price
        best_price = market_price
        best_revenue = 0

        # Iterate over each adjusted price to calculate revenue
        for adjusted_price in adjusted_prices:
            # Prepare input data for the model
            input_data = pd.DataFrame({
                "Product_ID": [product_id],
                "Market_Price": [adjusted_price],
                "Base_Price": [base_price]
            })

            # Predict quantity
            predicted_quantity = ensemble_model.predict(input_data)[0]

            # Calculate revenue
            revenue = adjusted_price * predicted_quantity

            # Update the best price if current revenue is higher
            if revenue > best_revenue:
                best_revenue = revenue
                best_price = adjusted_price

        # Update the document in the database with the best market price
        cards_collection.update_one(
            {'_id': document['_id']},
            {"$set": {"new_Market_Price": best_price}}
        )
        print(f"Updated document ID {document['_id']} with new Market_Price: {best_price}, Revenue: {best_revenue}")

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
