import pandas as pd
import numpy as np

# Load the original dataset
data = pd.read_csv("updated_data_cleaned_with_date_columns.csv")

# Display the original dataset structure
print("Original Dataset Head:")
print(data.head())

# Modify `Quantity` to depend more heavily on `Market_Price`
# Recalculate `Quantity` as a weighted combination of relevant features
weights = {
    "Market_Price": 0.7,  # High weight to Market_Price
    "Cart Count": 0.1,
    "Visibility": 0.05,
    "Stars": 0.05,
    "Reviews Count": 0.05,
    "Base_Price": 0.05,
}

# Ensure all required columns exist in the dataset
missing_columns = [col for col in weights.keys() if col not in data.columns]
if missing_columns:
    raise ValueError(f"The following required columns are missing: {missing_columns}")

# Calculate new Quantity
data["Quantity"] = (
    weights["Market_Price"] * data["Market_Price"]
    + weights["Cart Count"] * data["Cart Count"]
    + weights["Visibility"] * data["Visibility"]
    + weights["Stars"] * data["Stars"]
    + weights["Reviews Count"] * data["Reviews Count"]
    + weights["Base_Price"] * data["Base_Price"]
)

# Add some randomness to the Quantity for realism
data["Quantity"] = data["Quantity"] + np.random.randint(1, 10, size=len(data))

# Clip the Quantity values to ensure they remain within a reasonable range
data["Quantity"] = data["Quantity"].clip(lower=1, upper=500)

# Save the modified dataset
new_filename = "High_Imp.csv"
data.to_csv(new_filename, index=False)

print(f"Modified dataset saved to {new_filename}.")
