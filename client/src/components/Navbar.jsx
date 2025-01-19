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
            <NavLink to="/">VIU</NavLink>
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

              {isLoggedIn ? (
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
