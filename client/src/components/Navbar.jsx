import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header>
        <div className="container">
        <div className="logo-brand">
  <NavLink to="/">
    <span className="logo-text">VIU</span>
  </NavLink>
  <style jsx>{`
    .logo-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Poppins', sans-serif;
      padding: 0.5rem 1rem;
    }

    .logo-text {
      font-size: 2rem;
      font-weight: bold;
      color:rgb(185, 214, 244); /* Attractive blue color */
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      letter-spacing: 2px;
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .logo-text:hover {
      color: #00b4d8; /* Slightly lighter blue on hover */
      transform: scale(1.1); /* Slight zoom-in effect */
    }
  `}</style>
</div>


          <nav>
            <ul>
              <li>
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="nav-link">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/card" className="nav-link">
                  Sunglasses
                </NavLink>
              </li>
              
              <li>
                <NavLink to="/contact" className="nav-link">
                  Contact
                </NavLink>
              </li>

              {isLoggedIn ?(
                <li>
                  <NavLink to="/logout" className="nav-link">
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
  <NavLink to="/register" className="nav-link register-button">
    Register
  </NavLink>
</li>
<li>
  <NavLink to="/login" className="nav-link login-button">
    Login
  </NavLink>
</li>

                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
