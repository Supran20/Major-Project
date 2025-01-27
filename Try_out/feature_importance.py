import matplotlib.pyplot as plt
import numpy as np

# Feature importance values (example, based on potential significance order given)
feature_importance = [0.25, 0.20, 0.15, 0.12, 0.10, 0.10, 0.08]

# Corresponding feature names
features = [
    "Visibility",
    "Market_Price",
    "Review score",
    "Number of Reviewers",
    "Stock",
    "Base_Price",
    "Order Date",
]

# Plotting the feature importance graph
plt.figure(figsize=(10, 6))
plt.barh(features, feature_importance, color="skyblue")
plt.xlabel("Importance", fontsize=12)
plt.ylabel("Features", fontsize=12)
plt.title("Feature Importance Towards Quantity", fontsize=14)
plt.gca().invert_yaxis()  # Invert y-axis to display the most important feature at the top
plt.grid(axis='x', linestyle='--', alpha=0.7)
plt.show()
