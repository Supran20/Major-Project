import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export const ProductCard = () => {
  const { cards } = useAuth(); // Assuming cards data is available in the Auth store
  const navigate = useNavigate(); // React Router's navigation hook

  return (
    <div className="bg-gray-50 min-h-screen font-poppins">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-semibold">Sunglasses</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-4 py-2 border-2 border-gray-500 text-black bg-white rounded-md hover:bg-gray-500 hover:text-white transition">
            Filter
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Cards */}
          {cards && cards.length > 0 ? (
            cards.map((curElem, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(
                    `/card/${
                      curElem.link ||
                      curElem.Name.replace(/\s+/g, "-").toLowerCase()
                    }`
                  )
                } // Navigate to a dynamic URL
                className="bg-white text-gray-800 shadow-md rounded-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              >
                <img
                  src={curElem.imageURL || "/images/default.jpg"}
                  alt={curElem.Name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{curElem.Name}</h3>
                <p className="text-gray-500">Rs {curElem.Market_Price}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No cards available.
            </p>
          )}
        </div>

        {/* Load More Button */}
        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition">
            Load More Products
          </button>
        </div>
      </main>
    </div>
  );
};
