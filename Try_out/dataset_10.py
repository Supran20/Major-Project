import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Parameters for dataset creation
start_date = "2024-01-01"
end_date = "2024-07-15"
np.random.seed(42)

# Generate date range
date_range = pd.date_range(start=start_date, end=end_date)

# Number of products
num_products = 10

# Initialize empty DataFrame to store all products' data
all_data = []

# Generate data for each product
for product_id in range(1, num_products + 1):
    # Generate Market Price (random walk with upward trend, staying within 500-5000)
    base_price = 1000
    price_trend = np.cumsum(np.random.normal(0, 20, len(date_range)))
    market_price = base_price + price_trend
    market_price = np.clip(market_price, 500, 5000)  # Keep prices within range

    # Generate Base Price (always 300-500 less than the Market Price)
    base_price_values = market_price - np.random.randint(300, 501, len(date_range))
    base_price_values = np.clip(base_price_values, 500, 4700)  # Keep Base Price realistic

    # Define PED parameters
    elasticity_coefficient = -0.05  # Negative for inverse relationship
    base_demand = 80  # Average demand level

    # Calculate Quantity Demanded
    quantity_demanded = base_demand + elasticity_coefficient * (market_price - base_price)
    quantity_demanded += np.random.normal(0, 2, len(quantity_demanded))  # Add noise
    quantity_demanded = np.clip(quantity_demanded, 50, 100)  # Keep demand realistic

    # Create a DataFrame for each product
    product_data = pd.DataFrame({
        "Date": date_range,
        "Product_ID": product_id,
        "Market_Price": market_price.round(2),
        "Base_Price": base_price_values.round(2),
        "Quantity_Demanded": quantity_demanded.round(0).astype(int)
    })

    # Append product data to the main list
    all_data.append(product_data)

# Concatenate all product data into a single DataFrame
dataset = pd.concat(all_data, ignore_index=True)

# Save the dataset as CSV
csv_filename = "price_demand_dataset_10_products.csv"
dataset.to_csv(csv_filename, index=False)

# Visualize the data (first product as an example)
plt.figure(figsize=(14, 6))

# Market Price Plot for Product 1
plt.subplot(3, 1, 1)
plt.plot(dataset[dataset["Product_ID"] == 1]["Date"], 
         dataset[dataset["Product_ID"] == 1]["Market_Price"], label="Market Price", color="blue")
plt.title("Market Price Trend (Product 1)")
plt.xlabel("Date")
plt.ylabel("Market Price ($)")
plt.grid()
plt.legend()

# Base Price Plot for Product 1
plt.subplot(3, 1, 2)
plt.plot(dataset[dataset["Product_ID"] == 1]["Date"], 
         dataset[dataset["Product_ID"] == 1]["Base_Price"], label="Base Price", color="red")
plt.title("Base Price Trend (Product 1)")
plt.xlabel("Date")
plt.ylabel("Base Price ($)")
plt.grid()
plt.legend()

# Quantity Demanded Plot for Product 1
plt.subplot(3, 1, 3)
plt.plot(dataset[dataset["Product_ID"] == 1]["Date"], 
         dataset[dataset["Product_ID"] == 1]["Quantity_Demanded"], label="Quantity Demanded", color="green")
plt.title("Quantity Demanded Trend (Product 1)")
plt.xlabel("Date")
plt.ylabel("Quantity Demanded")
plt.grid()
plt.legend()

plt.tight_layout()
plt.show()

# Output CSV file path
print(f"Dataset saved as: {csv_filename}")
