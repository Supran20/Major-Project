import pandas as pd
import joblib
from pymongo import MongoClient
import schedule
import time

# Load the trained model
model_filename = 'xgb_model_market_price.pkl'
model = joblib.load(model_filename)

# Connect to the MongoDB cluster
client = MongoClient('mongodb+srv://msupran17:supran@supran.afauf7y.mongodb.net/?retryWrites=true&w=majority&appName=Supran')

# Specify the database and collections
db = client['Admin01']
cards_collection = db['cards']
colors_collection = db['colors']
materials_collection = db['materials']
features_collection = db['features']

# Function to check if a number is prime
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True

# Function to fetch frequency from the corresponding collection
def get_frequency(collection, attribute_name):
    doc = collection.find_one({"name": attribute_name})
    if doc:
        return doc.get("value", 0)  # Default to 0 if 'value' is missing
    return 0

# Function to update stock levels
def update_stock_levels():
    print("Running stock update task...")

    # Retrieve all documents in the cards collection
    documents = cards_collection.find()

    # Iterate through each document
    for document in documents:
        print("\nProcessing document:")
        for key, value in document.items():
            print(f"{key}: {value}")

        # Ensure that stock is present in the document
        try:
            # Get the current stock
            current_stock = document.get('Stock', 0)

            # If stock is 0, reload to 500
            if current_stock == 0:
                new_stock = 500
            else:
                # Decrease stock based on whether it is prime or not
                if is_prime(current_stock):
                    new_stock = current_stock - 77  # Decrease by 77 if prime
                else:
                    new_stock = current_stock - 57  # Decrease by 57 if not prime

                # Ensure stock doesn't go below 0 (stock will reload to 500 if it reaches 0)
                if new_stock < 0:
                    new_stock = 500

            print(f"Updating stock for card ID {document['_id']}: {new_stock}")

            # Update the document in the database with the new stock value
            update_data = {'Stock': new_stock}
            cards_collection.update_one({'_id': document['_id']}, {"$set": update_data})
            print(f"Stock updated for card ID {document['_id']}. New stock: {new_stock}")

        except Exception as e:
            print(f"Error updating stock for document ID {document['_id']}: {e}")

# Main task function to process documents and predict market price
def process_documents():
    print("Running market price prediction task...")

    # Retrieve all documents in the cards collection
    documents = cards_collection.find()

    # Iterate through each document
    for document in documents:
        print("\nProcessing document:")
        for key, value in document.items():
            print(f"{key}: {value}")

        # Ensure all required fields are present in the document
        try:
            # Fetch frequencies dynamically
            color_frequency = get_frequency(colors_collection, document.get('Color', 'Unknown'))
            material_frequency = get_frequency(materials_collection, document.get('Material', 'Unknown'))
            feature_frequency = get_frequency(features_collection, document.get('Feature', 'Unknown'))

            # Prepare the input data for prediction
            input_data = {
                'Base Price': float(document.get('Base_Price', 0)),  # Default to 0 if missing
                'Stock': int(document.get('Stock', 0)),
                'No_of_Reviewers': int(document.get('No_of_Reviewers', 0)),
                'Pieces sold': int(document.get('Pieces_sold', 0)),
                'Feature_Frequency': feature_frequency,
                'Material_Frequency': material_frequency,
                'Color_Frequency': color_frequency,
                'Gender': int(document.get('Gender', 0))
            }

            # Convert input data to a DataFrame
            input_df = pd.DataFrame([input_data])

            # Predict the Market Price using the trained model
            predicted_market_price = model.predict(input_df)
            predicted_market_price_int = int(round(predicted_market_price[0]))  # Convert to integer
            print("Predicted Market Price (as integer):", predicted_market_price_int)

            # Update the document in the database with the predicted price as Market Price
            update_data = {'Market_Price': predicted_market_price_int}
            cards_collection.update_one({'_id': document['_id']}, {"$set": update_data})
            print("Database updated with new Market Price for document.")

        except TypeError as e:
            print(f"Error converting document fields to correct types: {e}")

# Function to extract data for "Round Metal Sunglasses" and store it in a new collection
def extract_and_store_glasses_data():
    print("Extracting data for 'Round Metal Sunglasses'...")

    # Retrieve the document(s) with the name "Round Metal Sunglasses"
    documents = cards_collection.find({"Name": "Round Metal Sunglasses"})

    # Target collection for storing the data
    target_collection = db["roundmetalsunglasses"]

    # Iterate through the retrieved documents
    for document in documents:
        try:
            # Remove the MongoDB internal '_id' field to avoid conflicts during insertion
            document_copy = {key: value for key, value in document.items() if key != '_id'}

            # Insert the data into the new collection
            target_collection.insert_one(document_copy)
            print(f"Data stored for ''roundmetalsunglasses'': {document_copy}")

        except Exception as e:
            print(f"Error while inserting data into ''roundmetalsunglasses'' collection: {e}")

# Scheduler setup
schedule.every(5).seconds.do(update_stock_levels)  # Runs the stock update task every 5 seconds
schedule.every(20).seconds.do(process_documents)   # Runs the market price prediction task every 20 seconds
schedule.every(8).seconds.do(extract_and_store_glasses_data)  # Runs the data extraction task every 8 seconds

# Keep the scheduler running
print("Scheduler is running...")
while True:
    schedule.run_pending()
    time.sleep(1)
