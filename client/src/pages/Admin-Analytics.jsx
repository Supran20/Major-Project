import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const AdminAnalytics = () => {
  const glasses = [
    { name: "Round Metal Sunglasses", link: "round-metal-sunglasses" },
    {
      name: "Blue Light Blocking Glasses",
      link: "blue-light-blocking-glasses",
    },
    { name: "Aviator Glasses", link: "aviator-glasses" },
    { name: "Oversized Glasses", link: "oversized-glasses" },
    { name: "Retro Round Glasses", link: "retro-round-glasses" },
    { name: "Cat Eye Sunglasses", link: "cat-eye-sunglasses" },
    { name: "Pilot Glasses", link: "pilot-glasses" },
    { name: "Square Frame Glasses", link: "square-frame-glasses" },
    { name: "Vintage Glasses", link: "vintage-glasses" },
    { name: "Hexagonal Frame Glasses", link: "hexagonal-frame-glasses" },
  ];

  return (
    <div className="admin-status-container">
      <h1>Admin Analytics Dashboard</h1>
      <div className="glasses-list-container">
        <h2>Available Glasses</h2>
        <ul className="glasses-list">
          {glasses.map((item, index) => (
            <li key={index} className="glasses-item">
              <Link
                to={`/admin/analytics/${item.link}`}
                className="glasses-link"
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
