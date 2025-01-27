import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Adjusted lower revenue dataset with zigzag pattern
lower_revenue_data = [
    {"Timestamp": "2025-01-09 10:00:00", "Pieces_sold": 20, "Market_Price": 1200},
    {"Timestamp": "2025-01-10 10:00:00", "Pieces_sold": 18, "Market_Price": 1300},
    {"Timestamp": "2025-01-11 10:00:00", "Pieces_sold": 25, "Market_Price": 1100},
    {"Timestamp": "2025-01-12 10:00:00", "Pieces_sold": 23, "Market_Price": 1400},
    {"Timestamp": "2025-01-13 10:00:00", "Pieces_sold": 28, "Market_Price": 1000},
    {"Timestamp": "2025-01-14 10:00:00", "Pieces_sold": 22, "Market_Price": 1500},
    {"Timestamp": "2025-01-15 10:00:00", "Pieces_sold": 30, "Market_Price": 1050},
    {"Timestamp": "2025-01-16 10:00:00", "Pieces_sold": 27, "Market_Price": 1250},
    {"Timestamp": "2025-01-17 10:00:00", "Pieces_sold": 24, "Market_Price": 1400},
    {"Timestamp": "2025-01-18 10:00:00", "Pieces_sold": 26, "Market_Price": 1150},
]

# Generate revenue with randomness within the range of 20,000 to 100,000
for record in lower_revenue_data:
    base_revenue = record['Pieces_sold'] * record['Market_Price']
    noise = np.random.uniform(-0.15, 0.15) * base_revenue  # Adding randomness
    record['Revenue'] = max(20000, min(100000, base_revenue + noise))

# Creating a DataFrame
lower_revenue_df = pd.DataFrame(lower_revenue_data)

# Converting 'Timestamp' to datetime
lower_revenue_df['Timestamp'] = pd.to_datetime(lower_revenue_df['Timestamp'])

# Plotting the adjusted lower revenue data
plt.figure(figsize=(10, 6))
plt.plot(lower_revenue_df['Timestamp'], lower_revenue_df['Revenue'], marker='o', linestyle='-', color='orange')
plt.title('Revenue Over Time (Max: 100,000, Min: 20,000)')
plt.xlabel('Date')
plt.ylabel('Revenue (in NPR)')
plt.xticks(rotation=45)
plt.grid(True)
plt.tight_layout()

# Show the plot
plt.show()
