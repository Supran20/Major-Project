import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./slide";

export const GlassInfo = () => {
  const { cardByName } = useParams(); // Extract card name from the URL
  const [glassData, setGlassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGlassDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/cd/card/${cardByName}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch card details");
        }
        const data = await response.json();
        setGlassData(data.data); // Assuming `data.data` contains the card details
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchGlassDetails();
  }, [cardByName]);

  return (
    <div className="bg-gray-100 min-h-screen font-poppins">
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : glassData ? (
          <div className="flex flex-wrap lg:flex-nowrap">
            <div className="flex-1 space-y-4">
              <img
                src={glassData.imageURL || "/images/default.jpg"}
                alt={glassData.Name}
                className="w-full h-auto"
              />
              {/* Add thumbnails here if available */}
            </div>
            <div className="flex-1 px-8">
              <h2 className="text-4xl font-bold mb-4">{glassData.Name}</h2>
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-2">Product Details</h3>
                <ul className="text-sm space-y-2">
                  <li>Frame Gender: {glassData.Gender || "N/A"}</li>
                  <li>Frame Color: {glassData.Color || "N/A"}</li>
                  <li>Frame Feature: {glassData.Feature || "N/A"}</li>
                  <li>Pieces Sold: {glassData.Pieces_sold || "N/A"}</li>
                  <li>
                    Number of Reviews: {glassData.No_of_Reviewers || "N/A"}
                  </li>
                  <li>Stock: {glassData.Stock || "N/A"}</li>
                </ul>
                <div className="flex items-center space-x-10 mt-10">
                  <h3 className="text-4xl font-semibold">
                    Rs {glassData.Market_Price || "N/A"}
                  </h3>
                  <button className="bg-[#0062B6] text-white px-8 py-4 rounded hover:bg-[#004C8C]">
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No data available for {cardByName}.</p>
        )}
        <h3 className="text-xl font-semibold ml-4 mt-4">You May Also Like</h3>
        <Carousel />
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 VIU. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};
