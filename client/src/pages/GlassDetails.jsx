import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Get `glassName` from URL params
import { useAuth } from "../store/auth"; // Ensure you have this hook for managing authentication

export const GlassDetails = () => {
  const { glassName } = useParams(); // Get glass name from URL
  const [glassData, setGlassData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const { authorizationToken } = useAuth(); // Authorization token from your auth hook

  // Format the glassName into a collection-friendly string
  const collectionName = glassName
    ?.toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/gi, "");

  // Function to fetch glass data
  const fetchGlassData = async () => {
    try {
      if (!authorizationToken) {
        throw new Error("Authorization token is missing.");
      }

      const response = await fetch(
        `http://localhost:5000/api/admin/status/${collectionName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken, // Include Bearer token if required
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data for ${glassName}: ${response.statusText}`
        );
      }

      const data = await response.json();
      setGlassData(data); // Directly set the data received from the database
      setError(null);
    } catch (err) {
      console.error("Error fetching glass data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false); // Ensure loading is set to false after fetching
    }
  };

  useEffect(() => {
    if (collectionName) {
      fetchGlassData();
    }
  }, [collectionName]);

  return (
    <section className="admin-glasses-section">
      <div className="container">
        <h1 className="glass-details-title">
          Glasses Details: {glassName || "Loading..."}
        </h1>
        {isLoading && <p>Loading data...</p>}
        {error && <p className="error-message">Error: {error}</p>}
        {!isLoading && !error && glassData.length === 0 && (
          <p>No data available for {glassName}.</p>
        )}
        {!isLoading && !error && glassData.length > 0 && (
          <div className="table-container">
            <table className="glass-details-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>No. of Reviewers</th>
                  <th>Pieces Sold</th>
                  <th>Base Price</th>
                  <th>Market Price</th>
                  <th>Timestamp</th> {/* New column for Timestamp */}
                </tr>
              </thead>
              <tbody>
                {glassData.map((glass, index) => {
                  const prevMarketPrice =
                    index > 0 ? glassData[index - 1]?.Market_Price : null;
                  let priceArrow = null;

                  if (prevMarketPrice !== null) {
                    if (glass.Market_Price > prevMarketPrice) {
                      priceArrow = (
                        <span
                          style={{
                            color: "green",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                          }}
                        >
                          ▲
                        </span>
                      );
                    } else if (glass.Market_Price < prevMarketPrice) {
                      priceArrow = (
                        <span
                          style={{
                            color: "red",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                          }}
                        >
                          ▼
                        </span>
                      );
                    }
                  }

                  return (
                    <tr key={glass._id || glass.No_of_Reviewers}>
                      <td>{glass.Stock || "N/A"}</td>
                      <td>{glass.No_of_Reviewers || "N/A"}</td>
                      <td>{glass.Pieces_sold || "N/A"}</td>
                      <td>{glass.Base_Price || "N/A"}</td>
                      <td>
                        {glass.Market_Price || "N/A"}{" "}
                        <span style={{ marginLeft: "10px" }}>{priceArrow}</span>
                      </td>
                      <td>{glass.Timestamp || "N/A"}</td>{" "}
                      {/* Use Timestamp from database */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
