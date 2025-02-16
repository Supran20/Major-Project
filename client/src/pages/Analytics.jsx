import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Get `glassName` from URL params
import { useAuth } from "../store/auth"; // Ensure you have this hook for managing authentication
import { Line } from "react-chartjs-2"; // Import Line Chart from Chart.js
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const Analytics = () => {
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
        `http://localhost:5000/api/admin/analytics/${collectionName}`,
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

  // Prepare data for Chart.js
  const chartData = {
    labels: glassData.map((glass) => `Sold: ${glass.Pieces_sold || "N/A"}`), // X-axis labels
    datasets: [
      {
        label: "Market Price",
        data: glassData.map((glass) => glass.Market_Price || 0), // Y-axis values
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        pointBackgroundColor: "blue",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Pieces Sold",
          font: { size: 14 },
        },
      },
      y: {
        title: {
          display: true,
          text: "Market Price",
          font: { size: 14 },
        },
      },
    },
  };

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
          <div style={{ width: "100%", height: "400px" }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </section>
  );
};
