import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

export const Analytics = () => {
  const { glassName } = useParams();
  const [glassData, setGlassData] = useState([]);
  const [weeklyProfit, setWeeklyProfit] = useState(0);
  const [piecesSoldLastWeek, setPiecesSoldLastWeek] = useState(0); // State for pieces sold in last week
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { authorizationToken } = useAuth();

  // Format glassName into a collection-friendly string
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
        `http://localhost:5000/api/admin/analytics/${collectionName}`,
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
      calculateWeeklyProfitAndPiecesSold(data); // Calculate profit and pieces sold in last week
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

  // Function to calculate weekly profit and pieces sold for the last 7 days
  const calculateWeeklyProfitAndPiecesSold = (data) => {
    const currentDate = new Date();
    const lastWeekDate = new Date(currentDate);
    lastWeekDate.setDate(currentDate.getDate() - 7); // Calculate the date 7 days ago

    let profitByWeek = {};
    let piecesSoldInLastWeek = 0; // To accumulate pieces sold in last 7 days

    data.forEach((glass) => {
      const date = new Date(glass.Timestamp);

      if (date >= lastWeekDate) {
        // Only consider data from the last 7 days
        const weekStart = new Date(
          date.setDate(date.getDate() - date.getDay())
        ); // Get start of the week (Sunday)
        const weekKey = weekStart.toISOString().split("T")[0]; // Format: YYYY-MM-DD

        const profit =
          (glass.Market_Price - glass.Base_Price) * (glass.Pieces_sold || 0);
        profitByWeek[weekKey] = (profitByWeek[weekKey] || 0) + profit;

        piecesSoldInLastWeek += glass.Pieces_sold || 0; // Accumulate pieces sold in the last week
      }
    });

    // Get the most recent week's profit
    const latestWeek = Object.keys(profitByWeek).sort().pop();
    setWeeklyProfit(profitByWeek[latestWeek] || 0);
    setPiecesSoldLastWeek(piecesSoldInLastWeek); // Set the total pieces sold in the last 7 days
  };

  // Prepare data for Chart.js
  const chartData = {
    labels: glassData.map(
      (glass) => new Date(glass.Timestamp).toISOString().split("T")[0] // Extract only YYYY-MM-DD
    ),
    datasets: [
      {
        label: "Market Price",
        data: glassData.map((glass) => glass.Market_Price || 0),
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
          text: "Date",
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
          <>
            <div style={{ width: "100%", height: "400px" }}>
              <Line data={chartData} options={chartOptions} />
            </div>
            <div className="weekly-profit">
              <h2>Weekly Profit: NPR {weeklyProfit.toLocaleString()}</h2>
            </div>
            <div className="pieces-sold-last-week">
              <h2>
                Pieces Sold in Last 7 Days:{" "}
                {piecesSoldLastWeek.toLocaleString()}
              </h2>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
