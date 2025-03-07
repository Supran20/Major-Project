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
  const { glassName } = useParams();
  const [glassData, setGlassData] = useState([]);
  const [weeklyProfit, setWeeklyProfit] = useState(0);
  const [piecesSoldLastWeek, setPiecesSoldLastWeek] = useState(0); // State for pieces sold in the last 7 entries
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
      calculateWeeklyProfitAndPiecesSold(data); // Calculate profit and pieces sold for the last 7 data entries
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

  // Function to calculate weekly profit and pieces sold from the last 7 entries
  const calculateWeeklyProfitAndPiecesSold = (data) => {
    let totalProfit = 0;
    let totalPiecesSold = 0;

    // Get the last 7 entries from the data
    const lastSevenEntries = data.slice(-7);

    lastSevenEntries.forEach((glass) => {
      // Calculate the total profit for the week
      const profit =
        (glass.Market_Price - glass.Base_Price) * (glass.Pieces_sold || 0);
      totalProfit += profit;

      // Accumulate total pieces sold in the last 7 entries
      totalPiecesSold += glass.Pieces_sold || 0;
    });

    setWeeklyProfit(totalProfit); // Set the total weekly profit
    setPiecesSoldLastWeek(totalPiecesSold); // Set the total pieces sold in the last 7 entries
  };

  // Prepare data for Chart.js
  const chartData = {
    labels: glassData.slice(-7).map(
      (glass) => new Date(glass.Timestamp).toISOString().split("T")[0] // Extract only YYYY-MM-DD for last 7 entries
    ),
    datasets: [
      {
        label: "Market Price",
        data: glassData.slice(-7).map((glass) => glass.Market_Price || 0),
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
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Glasses Details: {glassName || "Loading..."}
        </h1>
        {isLoading && (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
        {error && (
          <p className="text-center text-red-500 font-semibold mt-4">{`Error: ${error}`}</p>
        )}
        {!isLoading && !error && glassData.length === 0 && (
          <p className="text-center text-gray-500">
            No data available for {glassName}.
          </p>
        )}
        {!isLoading && !error && glassData.length > 0 && (
          <>
            <div className="w-full h-96 mt-6">
              <Line data={chartData} options={chartOptions} />
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg mt-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Weekly Profit:{" "}
                <span className="text-green-500">
                  NPR {weeklyProfit.toLocaleString()}
                </span>
              </h2>
            </div>
            <div className="bg-white p-4 shadow-md rounded-lg mt-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Pieces Sold in Last 7 Entries:{" "}
                <span className="text-blue-500">
                  {piecesSoldLastWeek.toLocaleString()}
                </span>
              </h2>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
