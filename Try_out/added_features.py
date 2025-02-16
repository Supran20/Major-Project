import pandas as pd
import random

# Load the dataset
file_path = "generate_ml_2.csv"
df = pd.read_csv(file_path)

# Add the new columns
df['Visibility'] = [random.uniform(0.5, 1.0) for _ in range(len(df))]  # Random visibility between 0.5 and 1.0
df['Reviews(1-5)'] = [random.randint(1, 5) for _ in range(len(df))]  # Random reviews between 1 and 5
df['Number of Reviewers'] = [random.randint(10, 500) for _ in range(len(df))]  # Random number of reviewers
df['Base_Price'] = df['Market_Price'] * random.uniform(0.5, 0.9)  # Base Price < Market Price
df['Stock'] = [random.randint(50, 500) for _ in range(len(df))]  # Random stock levels between 50 and 500

# Save the updated dataset
output_path = "updated_generate_ml_2.csv"
df.to_csv(output_path, index=False)

print(f"Updated dataset saved to {output_path}")
