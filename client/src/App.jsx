import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { ProductCard } from "./pages/Card";
{
  /* <Route path="/product/:id" element={<ProductDetails />} /> */
}
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Navbar } from "./components/Navbar";
import { AdminLayout } from "./components/layouts/AdminLayout";
import { AdminUsers } from "./pages/Admin-User";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-Update";
import { AdminStatus } from "./pages/Admin-Status";
import { AdminAnalytics } from "./pages/Admin-Analytics";
import { GlassDetails } from "./pages/GlassDetails";
import { Analytics } from "./pages/Analytics";
import ProductDetail from "./pages/ProductDetails";

//subscribe Suprantechnical channel for more awesome content.

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/card" element={<ProductCard />} />
        {/* <Route path="/products/:id" element={<ProductDetail />} /> */}
        <Route path="/card/:name" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="status" element={<AdminStatus />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="status/:glassName" element={<GlassDetails />} />
          <Route path="analytics/:glassName" element={<Analytics />} />
          <Route path="user/:id/edit" element={<AdminUpdate />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
