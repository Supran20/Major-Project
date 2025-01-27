import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

export const ProductCard = () => {
  const { cards } = useAuth();

  return (
    <>
      <section className="section-cards">
        <div className="container">
          <h1 className="main-heading">Exclusive Sunglasses Collection</h1>
        </div>

        <div className="container grid grid-three-cols">
          {cards && cards.length > 0 ? (
            cards.map((curElem, index) => (
              <Link
                to={`/card/${curElem.Name}`}
                key={index}
                className="product-card-link"
              >
                <div className="card">
                  <div className="card-img">
                    <img
                      src={curElem.imageURL || "/images/default.jpg"}
                      alt={curElem.Name}
                      className="card-img-main"
                    />
                  </div>
                  <div className="card-details">
                    <h2 className="product-name">{curElem.Name}</h2>
                    <div className="price-section">
                      {curElem.new_Market_Price < curElem.Market_Price ? (
                        <p className="old-price">Rs {curElem.Market_Price}</p>
                      ) : null}
                      <p className="new-price">Rs {curElem.new_Market_Price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-cards-message">
              No sunglasses available at the moment.
            </p>
          )}
        </div>
      </section>

      <style>
        {`
          .section-cards {
            padding: 2rem 0;
            font-family: Arial, sans-serif;
          }
          .container {
            max-width: 1200px;
            margin: auto;
            padding: 0 1rem;
          }
          .main-heading {
            text-align: center;
            margin-bottom: 2rem;
            font-size: 2rem;
          }
          .grid {
            display: grid;
            gap: 2rem;
          }
          .grid-three-cols {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
          .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease;
            text-align: center;
          }
          .card:hover {
            transform: scale(1.02);
          }
          .card-img img {
            width: 100%;
            height: auto;
            max-height: 200px;
          }
          .card-details {
            padding: 1rem;
          }
          .product-name {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }
          .price-section {
            display: flex;
            justify-content: center;
            align-items: baseline;
            gap: 0.5rem;
          }
          .old-price {
            font-size: 1rem;
            color: #888;
            text-decoration: line-through;
          }
          .new-price {
            font-size: 1.5rem;
            color: #e63946;
            font-weight: bold;
          }
          .product-card-link {
            text-decoration: none;
            color: inherit;
          }
          .no-cards-message {
            text-align: center;
            color: #888;
            font-size: 1.2rem;
          }
        `}
      </style>
    </>
  );
};
