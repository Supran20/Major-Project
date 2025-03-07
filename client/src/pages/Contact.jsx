import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [data, setData] = useState(defaultContactFormData);
  const { user } = useAuth();

  // Update form data with user information if available
  useEffect(() => {
    if (user) {
      setData((prevData) => ({
        ...prevData,
        username: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Handle form input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleContactForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setData(defaultContactFormData);
        const responseData = await response.json();
        alert("Message sent successfully: " + responseData.message);
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  return (
    <section className="section-contact bg-gray-100 py-16">
      <div className="contact-content container mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="contact-img flex justify-center">
          <img
            src="/images/contact.png"
            alt="Always ready to help you"
            className="w-full h-auto max-w-full rounded-lg shadow-lg"
          />
        </div>

        <section className="section-form space-y-6">
          <form onSubmit={handleContactForm} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-xl text-gray-800">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handleInput}
                autoCapitalize="off"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xl text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={data.email}
                onChange={handleInput}
                autoCapitalize="off"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xl text-gray-800">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={data.message}
                onChange={handleInput}
                autoCapitalize="off"
                required
                cols="30"
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
            </div>

            <div className="space-y-4 text-center">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
