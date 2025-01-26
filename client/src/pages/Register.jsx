import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const { storeTokenInLS } = useAuth();

  // Input change handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("Registration successful");
        storeTokenInLS(responseData.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/");
      } else {
        alert(responseData.extraDetails || responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.formContainer}>
        <h1 style={styles.heading}>Register</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInput}
              placeholder="Enter your username"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleInput}
              placeholder="Enter your phone number"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Register Now
          </button>
        </form>
      </div>
    </section>
  );
};

// Inline styles for the component
const styles = {
  section: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#bababa",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
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
  input: {
    padding: "10px",
    border: "2px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    color: "black",
    backgroundColor: "white"
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#082c3c",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
  },
};
