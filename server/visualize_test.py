import streamlit as st
import pandas as pd
import joblib

# Load the trained XGBoost model
model = joblib.load("xgb_model_market_price.pkl")

# Example function to fetch frequencies
def get_frequency(collection, key):
    return collection.get(key, 0.1)  # Default frequency if not found

# Frequency collections
colors_collection = {"Red": 0.2, "Blue": 0.3, "Black": 0.5}
materials_collection = {"Plastic": 0.4, "Metal": 0.3, "Acetate": 0.2}
features_collection = {"Polarized": 0.3, "UV Protection": 0.4, "Anti-Glare": 0.2}

# Sidebar inputs for dynamic factors
st.sidebar.title("Dynamic Inputs for Price Prediction")
base_price = st.sidebar.slider("Base Price ($)", min_value=20, max_value=100, value=50)
stock = st.sidebar.slider("Stock", min_value=0, max_value=500, value=100)
no_of_reviewers = st.sidebar.slider("Number of Reviewers", min_value=0, max_value=500, value=20)
pieces_sold = st.sidebar.slider("Pieces Sold", min_value=0, max_value=500, value=15)
color = st.sidebar.selectbox("Color", list(colors_collection.keys()))
material = st.sidebar.selectbox("Material", list(materials_collection.keys()))
feature = st.sidebar.selectbox("Feature", list(features_collection.keys()))
gender = st.sidebar.selectbox("Gender", [0, 1], format_func=lambda x: "Male" if x == 1 else "Female")

# Fetch dynamic frequencies
color_frequency = get_frequency(colors_collection, color)
material_frequency = get_frequency(materials_collection, material)
feature_frequency = get_frequency(features_collection, feature)

# Prepare input data for prediction
input_data = {
    "Base Price": base_price,
    "Stock": stock,
    "No_of_Reviewers": no_of_reviewers,
    "Pieces sold": pieces_sold,
    "Feature_Frequency": feature_frequency,
    "Material_Frequency": material_frequency,
    "Color_Frequency": color_frequency,
    "Gender": gender,
}

# Convert input data to a DataFrame
input_df = pd.DataFrame([input_data])

# Predict market price
predicted_market_price = model.predict(input_df)[0]
predicted_price_int = int(round(predicted_market_price))

# Display results
st.title("Dynamic Price Optimization")
st.write("### Input Factors")
st.write(input_df)

st.write("### Predicted Market Price")
st.write(f"**${predicted_price_int}**")

# Visualize price variations
st.write("### Price Variation Analysis")
variation = predicted_price_int - base_price
st.metric(label="Price Variation", value=f"${variation}", delta=variation)
