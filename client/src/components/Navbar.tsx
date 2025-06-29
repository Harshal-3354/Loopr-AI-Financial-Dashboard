import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [location]); // re-run on route change

  const handleLogout = () => {
    // Just remove the cookie by calling a logout API (if implemented), or:
    document.cookie = "token=; Max-Age=0"; // optional if no /logout
    setIsLoggedIn(false);
    navigate("/auth/login");
  };

  return (
    <nav className="flex justify-between items-center bg-blue-600 px-6 py-4 text-white">
      <h1 className="text-xl font-bold">Finance Dashboard</h1>
      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/auth/login" className="hover:underline">Login</Link>
            <Link to="/auth/signup" className="hover:underline">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
