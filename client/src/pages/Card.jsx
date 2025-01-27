import { useAuth } from "../store/auth";

export const ProductCard = () => {
  const { cards } = useAuth();
  console.log(cards);

  return (
    <section className="section-cards">
      <div className="container grid grid-three-cols">
        {cards && cards.length > 0 ? (
          cards.map((curElem, index) => {
            return (
              <div className="card" key={index}>
                <div className="card-img">
                  <img
                    src={curElem.imageURL || "/images/default.jpg"}
                    alt={curElem.Name}
                    style={{ width: "100%", objectFit: "contain" }}
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
            );
          })
        ) : (
          <p>No cards available.</p>
        )}
      </div>

      <style jsx>{`
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
        }
        .card:hover {
          transform: scale(1.02);
        }
        .card-img img {
          max-height: 200px;
          margin: 0 auto;
          display: block;
        }
        .card-details {
          padding: 1rem;
          text-align: center;
        }
        .product-name {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .price-section {
          display: flex;
          justify-content: center;
          gap: 1rem;
          align-items: baseline;
        }
        .old-price {
          text-decoration: line-through;
          color: #888;
        }
        .new-price {
          font-size: 1.5rem;
          color: #e63946;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
};
