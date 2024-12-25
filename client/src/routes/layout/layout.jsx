import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// Layout component
function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

// RequireAuth component
function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  // If the user is not logged in, navigate to the login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the Layout
  return <Layout />;
}

export { Layout, RequireAuth };
