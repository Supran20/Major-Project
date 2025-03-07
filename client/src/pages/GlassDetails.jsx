import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

export const GlassDetails = () => {
  const { glassName } = useParams();
  const [glassData, setGlassData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authorizationToken } = useAuth();

  const collectionName = glassName
    ?.toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/gi, "");

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
            Authorization: authorizationToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data for ${glassName}: ${response.statusText}`
        );
      }

      const data = await response.json();
      setGlassData(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching glass data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (collectionName) {
      fetchGlassData();
    }
  }, [collectionName]);

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-4">
          Glasses Details: {glassName || "Loading..."}
        </h1>
        {isLoading && (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
        {error && (
          <p className="text-center text-red-500 font-semibold mt-4">
            Error: {error}
          </p>
        )}
        {!isLoading && !error && glassData.length === 0 && (
          <p className="text-center text-gray-500">
            No data available for {glassName}.
          </p>
        )}
        {!isLoading && !error && glassData.length > 0 && (
          <div className="overflow-x-auto mt-8">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-3 px-6">Stock</th>
                  <th className="py-3 px-6">No. of Reviewers</th>
                  <th className="py-3 px-6">Pieces Sold</th>
                  <th className="py-3 px-6">Base Price</th>
                  <th className="py-3 px-6">Market Price</th>
                  <th className="py-3 px-6">Competitor Price</th>
                  <th className="py-3 px-6">Timestamp</th>
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
                        <span className="text-green-500 text-xl font-bold">
                          ▲
                        </span>
                      );
                    } else if (glass.Market_Price < prevMarketPrice) {
                      priceArrow = (
                        <span className="text-red-500 text-xl font-bold">
                          ▼
                        </span>
                      );
                    }
                  }

                  return (
                    <tr
                      key={glass._id || glass.No_of_Reviewers}
                      className="border-b"
                    >
                      <td className="py-3 px-6">{glass.Stock || "N/A"}</td>
                      <td className="py-3 px-6">
                        {glass.No_of_Reviewers || "N/A"}
                      </td>
                      <td className="py-3 px-6">
                        {glass.Pieces_sold || "N/A"}
                      </td>
                      <td className="py-3 px-6">{glass.Base_Price || "N/A"}</td>
                      <td className="py-3 px-6">
                        {glass.Market_Price || "N/A"}{" "}
                        <span className="ml-2">{priceArrow}</span>
                      </td>
                      <td className="py-3 px-6">
                        {glass.Competitor_Price || "N/A"}
                      </td>
                      <td className="py-3 px-6">{glass.Timestamp || "N/A"}</td>
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
