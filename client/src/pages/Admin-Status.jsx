import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const AdminStatus = () => {
  const glasses = [
    { name: "Round Metal Sunglasses", link: "round-metal-sunglasses" },
    { name: "Classic Aviator Shades", link: "classic-aviator-shades" },
    { name: "Polarized Sports Glasses", link: "polarized-sports-glasses" },
    { name: "Vintage Round Glasses", link: "vintage-round-glasses" },
    { name: "Square Designer Frames", link: "square-designer-frames" },
    {
      name: "Lightweight Titanium Glasses",
      link: "lightweight-titanium-glasses",
    },
    { name: "Cat Eye Sunglasses", link: "cat-eye-sunglasses" },
    { name: "Eco-Friendly Frames", link: "eco-friendly-frames" },
    {
      name: "High Definition Reading Glasses",
      link: "high-definition-reading-glasses",
    },
    { name: "Retro Horn-Rimmed Glasses", link: "retro-horn-rimmed-glasses" },
    { name: "Gradient Lens Sunglasses", link: "gradient-lens-sunglasses" },
    { name: "Stylish Oval Frames", link: "stylish-oval-frames" },
    {
      name: "Blue Light Blocking Glasses",
      link: "blue-light-blocking-glasses",
    },
    { name: "Mirrored Aviator Glasses", link: "mirrored-aviator-glasses" },
    { name: "Semi-Rimless Frames", link: "semi-rimless-frames" },
    { name: "Tortoiseshell Glasses", link: "tortoiseshell-glasses" },
    {
      name: "Over-Sized Square Sunglasses",
      link: "oversized-square-sunglasses",
    },
    { name: "Photochromic Lens Glasses", link: "photochromic-lens-glasses" },
    {
      name: "Transparent Frame Glasses",
      link: "transparent-frame-glasses",
    },
    { name: "Metallic Finish Frames", link: "metallic-finish-frames" },
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
