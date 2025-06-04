import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import supabase from "../../supabase";

const Header = ({ setIsLoading, setLoadingMessage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [username, setUsername] = useState(null); // State variable to store the username
  const [userPermission, setUserPermission] = useState(null); // State variable to store the user permission
  const navigate = useNavigate();
  const location = useLocation();

  // Create refs for the mobile menu and hamburger icon
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false); // Close the mobile menu
  };

  const logOutConfirmClick = () => {
    setShowLogoutModal(false); // Close the logout confirmation modal
    setIsLoading(true); // Show loading screen
    setLoadingMessage("Signing out..."); // Set loading message

    // Simulate a delay (e.g., API call or navigation)
    setTimeout(() => {
      setIsLoading(false); // Hide loading screen
      navigate("/"); // Navigate to the login page
    }, 2000); // 2-second delay
  };

  // Check if the current route is Login or Register
  const noButtonMenu =
    location.pathname === "/login" ||
    location.pathname === "/" ||
    location.pathname === "/verify" ||
    location.pathname === "/register";

  // Fetch the username and user permission from local storage or an API
  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("username, permission")
        .eq("username", localStorage.getItem("username"))
        .maybeSingle();

      if (error) {
        console.error("Error fetching user data:", error);
      } else if (data) {
        setUsername(data.username);
        setUserPermission(data.permission);
      } else {
        console.error("No user data found");
      }
    };

    fetchUserData();
  }, []);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the menu and hamburger icon
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        closeMenu(); // Close the menu
      }
    };

    // Add event listener when the menu is open
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]); // Re-run effect when menuOpen changes

  return (
    <div className="md:px-20 px-5 flex w-screen h-[55px] bg-[#6c005d] justify-between z-50 items-center space-x-2 relative">
      {/* Conditionally render Link or div based on the route */}
      {noButtonMenu ? (
        <div className="flex items-center space-x-2 justify-center text-sm md:text-xl text-white">
          <img
            className="w-[40px] h-[40px]"
            src="/images/eBuksanLogo.png"
            alt="e-buksanlogo"
          />
          <p className="text-white">E-Buksan</p>
        </div>
      ) : (
        <Link to="/dashboard">
          <div className="flex items-center space-x-2 justify-center text-sm md:text-xl text-white">
            <img
              className="w-[40px] h-[40px]"
              src="/images/eBuksanLogo.png"
              alt="e-buksanlogo"
            />
            <p className="text-white">E-Buksan | </p>
            {username ? (
              <>
                <p>Good Day!</p>
                <p>{username}</p>
              </>
            ) : (
              <p>E-Buksan</p>
            )}
          </div>
        </Link>
      )}

      {/* Hamburger Icon for mobile */}
      {!noButtonMenu && (
        <div
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          ref={hamburgerRef}
        >
          <div className="text-white text-2xl">{menuOpen ? "×" : "☰"}</div>
        </div>
      )}

      {/* Menu for mobile */}
      <ul
        ref={menuRef}
        className={`${
          menuOpen
            ? "flex flex-col space-y-5 p-5 absolute top-[65px] right-2 w-[210px] h-[295px] bg-[#6c005d] shadow-lg z-50"
            : "hidden"
        } md:hidden`}
      >
        {/* Conditionally render buttons if not on Login or Register page */}
        {username && !noButtonMenu && (
          <>
            <li className="text-xl text-white pt-5 text-right">
              <Link to="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
              <div className="w-[162px] h-[3px] bg-[#57003e] mt-3" />
            </li>
            <li className="text-xl text-white text-right">
              <Link to="/pet" onClick={closeMenu}>
                Alaga
              </Link>
              <div className="w-[162px] h-[3px] bg-[#57003e] mt-3" />
            </li>
            <li className="text-xl text-white text-right">
              <Link to="/about" onClick={closeMenu}>
                Tunkol sa E-Buksan
              </Link>
              <div className="w-[162px] h-[3px] bg-[#57003e] mt-3" />
            </li>
            {userPermission === 2 && ( // Show Admin button only if permission is 2
              <li className="text-xl text-white text-right">
                <Link to="/adminDashboard" onClick={closeMenu}>
                  Admin
                </Link>
                <div className="w-[162px] h-[3px] bg-[#57003e] mt-3" />
              </li>
            )}
            <li
              className="text-xl text-white text-right cursor-pointer"
              onClick={() => {
                closeMenu();
                setShowLogoutModal(true);
              }}
            >
              Log-out
              <div className="w-[162px] h-[3px] bg-[#57003e] mt-3" />
            </li>
          </>
        )}
      </ul>

      {/* Menu for desktop */}
      <ul className="space-x-5 text-white hidden md:flex">
        {/* Conditionally render buttons if not on Login or Register page */}
        {!noButtonMenu && (
          <>
            <li className="text-xl hover:text-white">
              <Link to="/dashboard">Home</Link>
            </li>
            <li className="text-xl hover:text-white">
              <Link to="/pet">Alaga</Link>
            </li>
            <li className="text-xl hover:text-white">
              <Link to="/about">Tungkol sa E-Buksan</Link>
            </li>
            <li className="text-xl hover:text-white">
              <Link to="/studentVideos">Tungkol sa Studyante</Link>
            </li>
            {userPermission === 2 && ( // Show Admin button only if permission is 2
              <li className="text-xl hover:text-white">
                <Link to="/adminDashboard">Admin</Link>
              </li>
            )}
            <li
              className="text-xl hover:text-white cursor-pointer"
              onClick={() => setShowLogoutModal(true)}
            >
              Log-out
            </li>
          </>
        )}
      </ul>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" bg-gradient-to-b from-[#ff4fa2] to-[#ec3893]  p-4 rounded-lg shadow-lg z-50">
            <p className="text-xl mb-4 text-white">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={logOutConfirmClick}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
