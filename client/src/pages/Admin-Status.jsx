import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const AdminStatus = () => {
  const glasses = [
    { name: "Round Metal Sunglasses", link: "round-metal-sunglasses" },
    {
      name: "Blue Light Blocking Glasses",
      link: "blue-light-blocking-glasses",
    },
    { name: "Classic Aviator Glasses", link: "classic-aviator-glasses" },
    {
      name: "Lightweight Titanium Glasses",
      link: "lightweight-titanium-glasses",
    },
    { name: "Polarized Sports Glasses", link: "polarized-sports-glasses" },
    { name: "Cat Eye Sunglasses", link: "cat-eye-sunglasses" },
    {
      name: "High Definition Reading Glasses",
      link: "high-definition-reading-glasses",
    },
    { name: "Square Designer Frames", link: "square-designer-frames" },
    { name: "Eco-Friendly Frames", link: "eco-friendly-frames" },
    { name: "Vintage Round Glasses", link: "vintage-round-glasses" },
  ];

  return (
    <div className="admin-status-container">
      <h1>Admin Status Dashboard</h1>
      <div className="glasses-list-container">
        <h2>Available Glasses</h2>
        <ul className="glasses-list">
          {glasses.map((item, index) => (
            <li key={index} className="glasses-item">
              <Link to={`/admin/status/${item.link}`} className="glasses-link">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
