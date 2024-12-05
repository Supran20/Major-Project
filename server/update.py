import pymongo
import schedule
import time

# Connect to MongoDB
client = pymongo.MongoClient('mongodb+srv://msupran17:supran@supran.afauf7y.mongodb.net/?retryWrites=true&w=majority&appName=Supran')

# Specify the database and collection
db = client['Admin01']
cards_collection = db['cards']

# Function to update stock levels
def update_stock_levels():
    print("Running scheduled task...")

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

            # Decrease stock by 1; if it hits 0, reset to 500
            new_stock = current_stock - 1 if current_stock > 0 else 500
            print(f"Updating stock for card ID {document['_id']}: {new_stock}")

            # Update the document in the database with the new stock value
            update_data = {'Stock': new_stock}
            cards_collection.update_one({'_id': document['_id']}, {"$set": update_data})
            print(f"Stock updated for card ID {document['_id']}. New stock: {new_stock}")

        except Exception as e:
            print(f"Error updating stock for document ID {document['_id']}: {e}")

# Scheduler setup: Run the update_stock_levels function every 5 seconds
schedule.every(5).seconds.do(update_stock_levels)

# Keep the scheduler running
print("Scheduler is running...")
while True:
    schedule.run_pending()
    time.sleep(1)
