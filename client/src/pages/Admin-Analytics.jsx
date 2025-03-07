import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const AdminAnalytics = () => {
  const glasses = [
    { name: "Elite Gold Sports Shades", link: "elite-gold-sport-shades" },
    { name: "Rayban Violet Gun", link: "rayban-violet-gun" },
    { name: "Classic Aviator Shades", link: "classic-aviator-shades" },
    { name: "Round Brown Sunglasses", link: "round-brown-sunglasses" },
    { name: "Steampunk Eclipse Shades", link: "steampunk-eclipse-shades" },
    { name: "Cat Eye Sunglasses", link: "cat-eye-sunglasses" },
    {
      name: "Oakley Rainbow Sports Glasses",
      link: "oakley-rainbow-sports-glasses",
    },
    { name: "Square Designer Frames", link: "square-designer-frames" },
    { name: "Round Metal Sunglasses", link: "round-metal-sunglasses" },
    {
      name: "Rayban Black Polarized Sunglasses",
      link: "rayban-black-polarized-sunglasses",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
        Admin Analytics Dashboard
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Available Glasses
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {glasses.map((item, index) => (
            <li
              key={index}
              className="bg-gray-50 shadow-md rounded-lg p-4 text-center hover:bg-purple-100 transition-transform transform hover:scale-105"
            >
              <Link
                to={`/admin/analytics/${item.link}`}
                className="text-lg font-medium text-purple-600 hover:underline"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
