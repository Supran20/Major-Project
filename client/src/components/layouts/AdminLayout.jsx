import { NavLink, Outlet } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { IoAnalytics } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { MdOutlineInventory } from "react-icons/md";
import { SiStatuspal } from "react-icons/si";

export const AdminLayout = () => {
  return (
    <>
      <header className="bg-gray-700 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <nav>
            <ul className="flex space-x-6 justify-center text-lg font-medium">
              <li>
                <NavLink
                  to="/admin/users"
                  className="flex items-center gap-2 hover:text-blue-400 transition"
                >
                  <FaUserLarge className="text-2xl" />
                  <span>Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/contacts"
                  className="flex items-center gap-2 hover:text-blue-400 transition"
                >
                  <IoMdContact className="text-2xl" />
                  <span>Contacts</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/inventory"
                  className="flex items-center gap-2 hover:text-blue-400 transition"
                >
                  <MdOutlineInventory className="text-2xl" />
                  <span>Inventory</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/analytics"
                  className="flex items-center gap-2 hover:text-blue-400 transition"
                >
                  <IoAnalytics className="text-2xl" />
                  <span>Analytics</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/status"
                  className="flex items-center gap-2 hover:text-blue-400 transition"
                >
                  <SiStatuspal className="text-2xl" />
                  <span>Status</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};
