import { Link } from "react-router-dom";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";
import { Code } from "lucide-react";

const Footer = () => {
  const { user, fetchUser } = UrlState();
  const { fn: fnLogout, loading } = useFetch(logout);

  const handleLogout = async () => {
    await fnLogout();
    fetchUser();
  };

  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
        
        {/* Left: Logo + copyright */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Link to="/">
            <img src="/logo.png" alt="Brevix Logo" className="h-12 sm:h-16" />
          </Link>
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} Brevix. All rights reserved.
          </div>
        </div>

        {/* Center: Nav links */}
        <nav className="flex gap-6 text-sm items-center justify-center flex-1">
          <Link to="/" className="font-bold hover:text-yellow-400 transition-colors">
            Home
          </Link>

          {!user ? (
            <>
              <Link
                to="/auth"
                className="font-bold hover:text-yellow-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="font-bold hover:text-yellow-400 transition-colors"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="font-bold hover:text-yellow-400 transition-colors"
              >
                My Links
              </Link>
              <button
                onClick={handleLogout}
                className="font-bold hover:text-yellow-400 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Right: Developer credit */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Code className="w-4 h-4" />
          Developed by Md Mozammil Alam
        </div>
      </div>

      {loading && <BarLoader width={"100%"} color="#36d7b7" />}
    </footer>
  );
};

export default Footer;
