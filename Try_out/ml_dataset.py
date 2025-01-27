import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

# Define the date range for the dataset
date_range = pd.date_range(start="2024-01-01", end="2024-07-15")

# Data for Product_ID 1
data_1 = {
    "Price ($)": [1490, 1300, 1000, 945, 800, 1250, 1350, 1350, 1400, 1450],
    "Quantity Demanded": [12, 18, 28, 30, 41, 20, 18, 17, 10, 11]
}

# Data for Product_ID 2
data_2 = {
    "Price ($)": [1565, 1800, 2000, 2200, 2455, 2400, 1550, 1950, 2100, 2350],
    "Quantity Demanded": [67, 58, 48, 39, 22, 22, 69, 50, 40, 32]
}

# Data for Product_ID 3
data_3 = {
    "Price ($)": [3990, 4000, 3100, 4500, 4999, 3200, 3500, 4100, 4100, 4800],
    "Quantity Demanded": [15, 18, 28, 8, 5, 25, 20, 17, 16, 10]
}

# Data for Product_ID 4
data_4 = {
    "Price ($)": [1490, 1300, 1000, 945, 920, 650, 1350, 550, 1400, 1450],
    "Quantity Demanded": [11, 12, 21, 23, 24, 34, 18, 38, 10, 11]
}

# Data for Product_ID 5
data_5 = {
    "Price ($)": [1490, 1100, 1000, 945, 800, 1250, 1350, 1350, 1400, 1450],
    "Quantity Demanded": [12, 15, 13, 15, 15, 12, 14, 15, 11, 12]
}

# Data for Product_ID 6
data_6 = {
    "Price ($)": [5490, 5100, 7800, 7650, 7500, 6700, 6550, 6350, 5400, 5450],
    "Quantity Demanded": [25, 28, 5, 8, 10, 17, 18, 17, 26, 29]
}

# Data for Product_ID 7
data_7 = {
    "Price ($)": [1490, 1300, 1000, 945, 800, 1250, 1350, 1350, 1400, 1450],
    "Quantity Demanded": [12, 12, 15, 11, 13, 14, 17, 15, 14, 14]
}

# Data for Product_ID 8
data_8 = {
    "Price ($)": [1490, 1300, 1000, 945, 800, 1900, 1800, 1550, 950, 1550],
    "Quantity Demanded": [22, 25, 34, 34, 41, 11, 12, 18, 39, 20]
}

# Data for Product_ID 9
data_9 = {
    "Price ($)": [3490, 3300, 4000, 4945, 5000, 5400, 5950, 3050, 3400, 4750],
    "Quantity Demanded": [18, 18, 12, 8, 6, 6, 3, 17, 15, 12]
}

# Data for Product_ID 10 (new data)
data_10 = {
    "Price ($)": [1490, 1300, 1000, 945, 800, 1250, 1350, 1350, 1400, 1450],
    "Quantity Demanded": [12, 18, 28, 30, 41, 20, 18, 17, 10, 11]
}

# Function to generate dataset for each product and calculate revenue
def generate_product_data(data, product_id):
    df = pd.DataFrame(data)
    
    # Train a linear regression model
    X = df[["Price ($)"]]
    y = df["Quantity Demanded"]
    model = LinearRegression()
    model.fit(X, y)
    
    # Predict quantities for the date range
    new_prices = np.random.randint(min(df["Price ($)"]), max(df["Price ($)"]) + 1, size=len(date_range))
    predicted_quantities = model.predict(new_prices.reshape(-1, 1))

    # Create new dataset
    new_data = {
        "Product_ID": [product_id] * len(date_range),
        "Date": date_range,
        "Price ($)": new_prices,
        "Quantity Demanded": np.round(predicted_quantities).astype(int)
    }
    new_dataset = pd.DataFrame(new_data)

    # Ensure quantities stay within bounds (10-50)
    new_dataset["Quantity Demanded"] = new_dataset["Quantity Demanded"].clip(lower=10, upper=50)

    # Calculate revenue
    new_dataset["Revenue ($)"] = new_dataset["Price ($)"] * new_dataset["Quantity Demanded"]
    
    # Find top 5 dates with highest revenue
    top_5_revenue = new_dataset.nlargest(5, "Revenue ($)")

    return new_dataset, top_5_revenue

# Generate datasets and top 5 revenue for each product
new_dataset_1, top_5_revenue_1 = generate_product_data(data_1, 1)
new_dataset_2, top_5_revenue_2 = generate_product_data(data_2, 2)
new_dataset_3, top_5_revenue_3 = generate_product_data(data_3, 3)
new_dataset_4, top_5_revenue_4 = generate_product_data(data_4, 4)
new_dataset_5, top_5_revenue_5 = generate_product_data(data_5, 5)
new_dataset_6, top_5_revenue_6 = generate_product_data(data_6, 6)
new_dataset_7, top_5_revenue_7 = generate_product_data(data_7, 7)
new_dataset_8, top_5_revenue_8 = generate_product_data(data_8, 8)
new_dataset_9, top_5_revenue_9 = generate_product_data(data_9, 9)
new_dataset_10, top_5_revenue_10 = generate_product_data(data_10, 10)  # Product_ID 10

# Save all datasets to a CSV file
final_dataset = pd.concat([new_dataset_1, new_dataset_2, new_dataset_3, new_dataset_4, new_dataset_5, new_dataset_6, new_dataset_7, new_dataset_8, new_dataset_9, new_dataset_10])
final_dataset.to_csv("generate_ml_2.csv", index=False)

# Display top 5 revenue for each product
print("Top 5 revenue for Product_ID 1:")
print(top_5_revenue_1)
print("\nTop 5 revenue for Product_ID 2:")
print(top_5_revenue_2)
print("\nTop 5 revenue for Product_ID 3:")
print(top_5_revenue_3)
print("\nTop 5 revenue for Product_ID 4:")
print(top_5_revenue_4)
print("\nTop 5 revenue for Product_ID 5:")
print(top_5_revenue_5)
print("\nTop 5 revenue for Product_ID 6:")
print(top_5_revenue_6)
print("\nTop 5 revenue for Product_ID 7:")
print(top_5_revenue_7)
print("\nTop 5 revenue for Product_ID 8:")
print(top_5_revenue_8)
print("\nTop 5 revenue for Product_ID 9:")
print(top_5_revenue_9)
print("\nTop 5 revenue for Product_ID 10:")
print(top_5_revenue_10)
