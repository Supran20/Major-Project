import numpy as np
import matplotlib.pyplot as plt

# Define constants
num_products = 5
time_steps = 30  # Number of days to simulate
season_multiplier = [1.2, 1.0, 0.8]  # Seasonal factors: Peak, Normal, Low

# Initial product data
products = {
    "Product 1": {"base_price": 50, "market_price": 70, "stock": 100},
    "Product 2": {"base_price": 40, "market_price": 60, "stock": 150},
    "Product 3": {"base_price": 70, "market_price": 90, "stock": 80},
    "Product 4": {"base_price": 30, "market_price": 50, "stock": 200},
    "Product 5": {"base_price": 90, "market_price": 120, "stock": 50},
}

# Simulated daily sales based on stock and price
sales_trend = np.random.uniform(0.8, 1.2, size=(time_steps, num_products))  # Random demand multiplier
season = np.random.choice(season_multiplier, time_steps)  # Random seasonal factor per day

# Arrays to store results
price_history = {name: [] for name in products}
revenue_history = []

# Simulation loop
for t in range(time_steps):
    daily_revenue = 0
    for i, (product, data) in enumerate(products.items()):
        # Dynamic price adjustment
        stock_factor = max(1 - data["stock"] / 200, 0.1)  # Higher prices for lower stock
        demand_factor = sales_trend[t, i]  # Random daily demand variation
        seasonal_factor = season[t]  # Seasonal impact

        dynamic_price = (
            data["market_price"]
            * stock_factor
            * demand_factor
            * seasonal_factor
        )
        dynamic_price = max(dynamic_price, data["base_price"])  # Ensure price doesn't drop below base price

        # Update stock and calculate revenue
        daily_sales = int(np.random.uniform(0, 5) * demand_factor)
        data["stock"] = max(data["stock"] - daily_sales, 0)
        daily_revenue += daily_sales * dynamic_price

        # Store price history
        price_history[product].append(dynamic_price)

    revenue_history.append(daily_revenue)

# Plot price history
plt.figure(figsize=(12, 6))
for product, prices in price_history.items():
    plt.plot(prices, label=product)
plt.title("Dynamic Price Simulation for Eyewear Products")
plt.xlabel("Days")
plt.ylabel("Price (in $)")
plt.legend()
plt.grid()
plt.show()

# Plot revenue history
plt.figure(figsize=(10, 5))
plt.plot(revenue_history, label="Daily Revenue", color="purple")
plt.title("Daily Revenue Over Time")
plt.xlabel("Days")
plt.ylabel("Revenue (in $)")
plt.grid()
plt.show()
