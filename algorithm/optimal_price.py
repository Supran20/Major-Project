import pandas as pd

# Load the dataset
file_path = "updated_data_with_avg_PED_and_Elasticity.csv"  # Update with the actual file path
df = pd.read_csv(file_path)

# Function to calculate optimized price
def calculate_optimized_price(market_price, avg_PED):
    if avg_PED == 0:  # Avoid division by zero
        return market_price
    return market_price * (1 - (1 / avg_PED))

# Apply the function to calculate the optimized price for each product
df['Optimized_Price'] = df.apply(lambda row: calculate_optimized_price(row['Market_Price'], row['avg_PED']), axis=1)

# Save the results to a new file
output_file_path = "optimized_prices.csv"
df.to_csv(output_file_path, index=False)

print(f"Optimized prices saved to {output_file_path}")
