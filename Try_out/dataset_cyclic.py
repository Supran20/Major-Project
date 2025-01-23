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

# Market price and quantity ranges for products
market_price_ranges = [
    (900, 1200), (2000, 3000), (3000, 4000), (4000, 5000),  # 1–4
    (900, 1200), (2000, 3000), (3000, 4000), (4000, 5000),  # 5–8 (repeated)
    (900, 1200), (2000, 3000)                               # 9–10 (repeated)
]

quantity_ranges = [
    (30, 60), (50, 80), (40, 70), (60, 90),  # 1–4
    (30, 60), (50, 80), (40, 70), (60, 90),  # 5–8 (repeated)
    (30, 60), (50, 80)                       # 9–10 (repeated)
]

# Initialize empty DataFrame to store all products' data
all_data = []

# Generate data for each product
for product_id in range(1, num_products + 1):
    market_price_range = market_price_ranges[product_id - 1]
    quantity_range = quantity_ranges[product_id - 1]

    # Generate Market Price
    base_price = np.mean(market_price_range)
    price_trend = np.cumsum(np.random.normal(0, 10, len(date_range)))
    market_price = base_price + price_trend
    market_price = np.clip(market_price, *market_price_range)

    # Base Price (always slightly lower than Market Price)
    base_price_values = market_price - np.random.randint(50, 200, len(date_range))
    base_price_values = np.clip(base_price_values, market_price_range[0] - 200, market_price_range[1] - 200)

    # Define PED parameters
    elasticity_coefficient = -0.05  # Negative for inverse relationship
    base_demand = np.mean(quantity_range)

    # Calculate Quantity Demanded
    quantity_demanded = base_demand + elasticity_coefficient * (market_price - base_price_values)
    quantity_demanded += np.random.normal(0, 2, len(quantity_demanded))  # Add noise
    quantity_demanded = np.clip(quantity_demanded, *quantity_range)  # Keep demand realistic

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
csv_filename = "price_demand_dataset_cyclical_quantities.csv"
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

# Quantity Demanded Plot for Product 1
plt.subplot(3, 1, 2)
plt.plot(dataset[dataset["Product_ID"] == 1]["Date"], 
         dataset[dataset["Product_ID"] == 1]["Quantity_Demanded"], label="Quantity Demanded", color="green")
plt.title("Quantity Demanded Trend (Product 1)")
plt.xlabel("Date")
plt.ylabel("Quantity Demanded")
plt.grid()
plt.legend()

# Base Price Plot for Product 1
plt.subplot(3, 1, 3)
plt.plot(dataset[dataset["Product_ID"] == 1]["Date"], 
         dataset[dataset["Product_ID"] == 1]["Base_Price"], label="Base Price", color="red")
plt.title("Base Price Trend (Product 1)")
plt.xlabel("Date")
plt.ylabel("Base Price ($)")
plt.grid()
plt.legend()

plt.tight_layout()
plt.show()

# Output CSV file path
print(f"Dataset saved as: {csv_filename}")
