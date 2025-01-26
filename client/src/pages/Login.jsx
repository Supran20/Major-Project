import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Login Successful");
        storeTokenInLS(responseData.token);
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        alert(
          responseData.extraDetails
            ? responseData.extraDetails
            : responseData.message
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <section className="login-section" style={styles.section}>
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.formContainer}>
            <h1 style={styles.heading}>Welcome Back!</h1>
            <p style={styles.subHeading}>
              Please log in to access your account.
            </p>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  placeholder="Enter your email"
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="Enter your password"
                  style={styles.input}
                  required
                />
              </div>
              <button type="submit" style={styles.button}>
                Login
              </button>
            </form>
            <p style={styles.footerText}>
              Don't have an account?{" "}
              <a href="/register" style={styles.link}>
                Sign up
              </a>
            </p>
          </div>
          {/* <div style={styles.imageContainer}>
            <img
              src="/images/login.png"
              alt="A welcoming illustration"
              style={styles.image}
            />
          </div> */}
        </div>
      </main>
    </section>
  );
};

const styles = {
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#bababa",
    fontFamily: "Arial, sans-serif",
  },
  main: {
    maxWidth: "1200px",
    width: "100%",
    padding: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  formContainer: {
    flex: 1,
    maxWidth: "500px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },

  heading: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "10px",
  },
  subHeading: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    padding: "10px",
    border: "2.5px solid #ccc",
    borderRadius: "4px",
    fontSize: "1.2rem",
    backgroundColor: "white",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#082c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  footerText: {
    marginTop: "15px",
    fontSize: "0.9rem",
    color: "#666",
  },
  link: {
    color: "#082c3c",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  // imageContainer: {
  //   flex: 1,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // image: {
  //   maxWidth: "400px",
  //   width: "100%",
  //   height: "auto",
  // },
};
