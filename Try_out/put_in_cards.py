from pymongo import MongoClient

# MongoDB connection
MONGODB_URI = "mongodb+srv://msupran17:supran@supran.afauf7y.mongodb.net/Admin01?retryWrites=true&w=majority&appName=Supran"
client = MongoClient(MONGODB_URI)
db = client["Admin01"]

# Access the 'cards' collection
cards_collection = db["cards"]

# Function to update the Market_Price and new_Market_Price based on the last two entries of respective collections
def update_market_prices():
    try:
        # Fetch all documents from the 'cards' collection
        cards = cards_collection.find()

        for card in cards:
            # Generate the collection name by converting the Name field to lowercase and removing spaces
            collection_name = card['Name'].lower().replace(' ', '')

            # Access the respective collection dynamically
            respective_collection = db[collection_name]

            # Retrieve the last two entries from that collection based on the Timestamp
            last_two_entries = respective_collection.find().sort('Timestamp', -1).limit(2)

            entries = list(last_two_entries)
            if len(entries) >= 2:
                # Last two entries
                new_market_price = entries[0].get('Market_Price')  # Last entry (most recent)
                market_price = entries[1].get('Market_Price')  # Second last entry

                if new_market_price and market_price:
                    # Update the new_Market_Price and Market_Price in the 'cards' collection
                    cards_collection.update_one(
                        {'Product_ID': card['Product_ID']},
                        {'$set': {'new_Market_Price': new_market_price, 'Market_Price': market_price}}
                    )
                    print(f"Updated new_Market_Price and Market_Price for {card['Name']}.")
                else:
                    print(f"Market_Price data not found for {card['Name']} in {collection_name}.")
            else:
                print(f"Not enough entries found in {collection_name} for {card['Name']}.")

    except Exception as e:
        print(f"An error occurred: {e}")

# Call the function to update prices
update_market_prices()
