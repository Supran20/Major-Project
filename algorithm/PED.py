import pandas as pd

# Load the dataset
df = pd.read_csv('updated_data_cleaned_with_date_columns.csv')

# Convert 'Order Date' to datetime format
df['Order Date'] = pd.to_datetime(df['Order Date'])

# Sort the dataframe by Product_Id and Order Date
df = df.sort_values(by=['Product_Id', 'Order Date'])

# Initialize a list for Elasticity Type
elasticity_types = [None] * len(df)  # Initialize the list with the same length as the dataframe

# Iterate over unique Product_Id's
for product_id in df['Product_Id'].unique():
    # Filter the data for each product
    product_data = df[df['Product_Id'] == product_id]
    
    # Initialize previous values for calculation
    prev_quantity = None
    prev_price = None
    product_peds = []
    
    # Calculate PED for each consecutive date pair
    for index, row in product_data.iterrows():
        current_quantity = row['Quantity']
        current_price = row['Market_Price']
        
        if prev_quantity is not None and prev_price is not None:
            # Calculate changes
            delta_quantity = current_quantity - prev_quantity
            delta_price = current_price - prev_price
            
            # Use try-except block to ignore division by zero
            try:
                ped = (delta_quantity / prev_quantity) * (prev_price / delta_price)
                product_peds.append(ped)
                
                # Store elasticity type based on PED value
                if abs(ped) > 1:
                    elasticity_types[index] = 'Elastic'
                elif abs(ped) < 1:
                    elasticity_types[index] = 'Inelastic'
                else:
                    elasticity_types[index] = 'Unitary Elastic'
            except ZeroDivisionError:
                # In case of zero division, append None for PED and elasticity
                product_peds.append(None)
                elasticity_types[index] = None
        
        # Update previous values
        prev_quantity = current_quantity
        prev_price = current_price
    
    # Store PED and Elasticity Type for each product
    valid_peds = [p for p in product_peds if p is not None]
    avg_ped = sum(valid_peds) / len(valid_peds) if valid_peds else None
    df.loc[df['Product_Id'] == product_id, 'avg_PED'] = avg_ped

# Assign elasticity types to the dataset based on calculated PED
df['Elasticity_Type'] = elasticity_types

# Save the updated dataframe to a new CSV file
df.to_csv('updated_data_with_avg_PED_and_Elasticity.csv', index=False)
