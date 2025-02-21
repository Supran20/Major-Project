import pandas as pd
import numpy as np

# Load the dataset
df = pd.read_csv("generate_ml_2.csv")

# Add 'Visibility' column with random values
df["Visibility"] = np.random.uniform(0.1, 10.0, size=len(df))

# Ensure consistent 'Review Score' per unique Product_ID
unique_products = df["Product_ID"].unique()
review_scores = {pid: round(np.random.uniform(1, 5), 1) for pid in unique_products}
df["Review Score"] = df["Product_ID"].map(review_scores)

# Add 'Number of Reviewers' column with random integer values
df["Number of Reviewers"] = np.random.randint(1, 501, size=len(df))

# Add 'Stock' column with random integer values (Example: stock between 0 and 100)
df["Stock"] = np.random.randint(0, 101, size=len(df))

# Ensure 'Market_Price' exists in the dataset
if "Market_Price" in df.columns:
    # Compute the minimum Market_Price for each Product_ID
    min_prices = df.groupby("Product_ID")["Market_Price"].min()

    # Generate Base_Price as 80% to 95% of the minimum Market_Price per Product_ID
    base_prices = {pid: min_prices[pid] * np.random.uniform(0.8, 0.95) for pid in unique_products}

    # Assign Base_Price to each row, ensuring it's the same for each Product_ID
    df["Base_Price"] = df["Product_ID"].map(base_prices)
else:
    print("Error: Column 'Market_Price' not found in the dataset!")

# Save the updated dataset
df.to_csv("generate_ml_2_updated.csv", index=False)
print(f"Columns 'Visibility', 'Review Score', 'Number of Reviewers', 'Stock', and 'Base_Price' added successfully!")
