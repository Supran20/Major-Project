import pandas as pd

# Load the dataset
df = pd.read_csv('updated_dataset.csv')

# Define a function to calculate Market_Price based on Quantity
def calculate_market_price(row):
    if row['Quantity'] <= 5:
        return row['Base_Price'] * 1.1
    elif row['Quantity'] <= 10:
        return row['Base_Price'] * 1.2
    elif row['Quantity'] <= 15:
        return row['Base_Price'] * 1.3
    elif row['Quantity'] <= 20:
        return row['Base_Price'] * 1.4
    return row['Base_Price']

# Add the new 'Market_Price' column
df['Market_Price'] = df.apply(calculate_market_price, axis=1)

# Add 500 to the Market_Price
df['Market_Price'] += 500

# Save the updated dataframe to a new CSV file
df.to_csv('updated_data.csv', index=False)
