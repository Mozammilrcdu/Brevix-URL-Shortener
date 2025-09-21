import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut, LinkIcon } from "lucide-react";
import { logout } from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";

const Header = () => {
  const { user, fetchUser } = UrlState();
  const { loading, fn: fnLogout } = useFetch(logout);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    await fnLogout();
    fetchUser();
    toast.success("Logged out successfully!", { duration: 3000 });
    navigate("/auth");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 backdrop-blur-md bg-transparent py-4 flex justify-between items-center px-6 ${
          scrolled ? "shadow-md bg-gray-900/50" : ""
        }`}
      >
        <Link to="/">
          <img src="/logo.png" className="h-16" alt="Brevix Logo" />
        </Link>

        <div className="flex gap-4 items-center">
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.profile_pic} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent sideOffset={5} className="!overflow-visible">
                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400 flex items-center gap-2"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
