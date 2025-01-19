import pandas as pd
from sklearn.impute import SimpleImputer

# Load the dataset
updated_data = pd.read_csv('updated_data.csv')

# Step 1: Separate numeric and non-numeric columns
numeric_columns = updated_data.select_dtypes(include=['number']).columns
non_numeric_columns = updated_data.select_dtypes(exclude=['number']).columns

# Step 2: Identify date-like columns (those with object type that can be converted to datetime)
date_columns = updated_data.select_dtypes(include=['object']).columns[updated_data.select_dtypes(include=['object']).apply(pd.to_datetime, errors='coerce').notna().all()]

# Step 3: Impute missing values for numeric columns (using mean), ensuring only valid numeric columns are imputed
numeric_imputer = SimpleImputer(strategy='mean')

# Check if there are any empty numeric columns
valid_numeric_columns = [col for col in numeric_columns if updated_data[col].notna().any()]

# Perform imputation only on columns with valid numeric data
if valid_numeric_columns:
    updated_data[valid_numeric_columns] = numeric_imputer.fit_transform(updated_data[valid_numeric_columns])

# Step 4: Handle non-numeric columns (excluding date columns)
non_numeric_columns = [col for col in non_numeric_columns if col not in date_columns]
non_numeric_imputer = SimpleImputer(strategy='most_frequent')
updated_data[non_numeric_columns] = non_numeric_imputer.fit_transform(updated_data[non_numeric_columns])

# Step 5: Handle date columns separately by converting them to datetime and extracting features
for date_column in date_columns:
    # Convert the date column to datetime format
    updated_data[date_column] = pd.to_datetime(updated_data[date_column], errors='coerce')

    # Create additional columns for year, month, day, and weekday
    updated_data[f'{date_column}_year'] = updated_data[date_column].dt.year
    updated_data[f'{date_column}_month'] = updated_data[date_column].dt.month
    updated_data[f'{date_column}_day'] = updated_data[date_column].dt.day
    updated_data[f'{date_column}_weekday'] = updated_data[date_column].dt.weekday

# Step 6: Verify if missing values were handled
print("Missing values after handling:")
print(updated_data.isnull().sum())  # Should print 0 for all columns

# Step 7: Save the cleaned dataset to a new CSV file
updated_data.to_csv('updated_data_cleaned_with_date_columns.csv', index=False)

print("Missing values have been handled, date columns processed, and the cleaned dataset is saved.")
