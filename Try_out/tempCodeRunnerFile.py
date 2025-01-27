
    max_revenue_index = np.argmax(revenues)
    optimized_price = adjusted_prices[max_revenue_index]
    optimized_label = percentage_labels[max_revenue_index]
    predicted_quantity = predicted_quantities[max_revenue_index]
    max_revenue = revenues[max_revenue_index]