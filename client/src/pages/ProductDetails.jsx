import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

const ProductDetail = () => {
  const { name } = useParams(); // Get the product name from the URL
  const { cards } = useAuth();

  // Find the product matching the name from the cards array
  const product = cards.find((curElem) => curElem.Name === name);

  if (!product) {
    return <p>Product not found.</p>; // If the product is not found
  }

  return (
    <div className="page-container">
      <div className="card">
        <div className="content-container">
          {/* Product Image */}
          <div className="image-container">
            <img
              src={product.imageURL || "/images/default-product.jpg"} // Use product's image URL
              alt={product.Name}
              className="product-image"
            />
          </div>

          {/* Product Details */}
          <div className="details-container">
            <h1 className="product-title">{product.Name}</h1>
            <p className="product-size">Size: {product.Size || "Standard"}</p>

            <div className="product-price">
              Rs.{product.new_Market_Price}{" "}
              {/* <span className="original-price">
                Rs.{product.Original_Price}
              </span> */}
            </div>

            <button className="button primary-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h10m0 0l-2-9m2 9h4m0 0a1 1 0 11-2 0m2 0a1 1 0 11-2 0"
                />
              </svg>
              Select Lenses
            </button>

            <button className="button secondary-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.586-4.586A2 2 0 1015 10zm1.414 1.414L14 12.828V14h1.172l1.414-1.414zM5 7h1.172L12 12.828V14h2v-1.172l5-5V7h1.172L19 5H5v2zm2.828 10H5v-2.828L7 12.828V14h1.172l-1.414 1.414z"
                />
              </svg>
              Try On
            </button>

            {/* Technical Information */}
            <div className="technical-info">
              <h2>Technical Information</h2>
              <p>Product ID: {product.ID || "N/A"}</p>
              <p>Model No.: {product.Model_No || "N/A"}</p>
              <ul>
                <li>Material: {product.Material || "Not specified"}</li>
                <li>Lens Type: {product.Lens_Type || "Not specified"}</li>
                <li>Color: {product.Color || "Not specified"}</li>
                <li>Frame Size: {product.Frame_Size || "Not specified"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
