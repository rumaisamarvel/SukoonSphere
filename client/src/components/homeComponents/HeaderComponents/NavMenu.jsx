import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { useUser } from "@/context/UserContext";
import CompanyLogo from "../../../assets/images/SukoonSphere_Logo.png";
import links from "@/utils/SharedComp/PageLinks";
import { MdKeyboardArrowUp } from "react-icons/md"
import DesktopNav from "./DesktopNav";
import UserMenu from "./UserMenu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";

function NavMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [miniMenu, setMiniMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleMiniMenu = () => setMiniMenu(!miniMenu);

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
      setMiniMenu(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full flex bg-white sticky top-0 items-center justify-between shadow-[0px_1px_10px_rgba(0,0,0,0.1)] z-50 transition-all ease-in-out p-2 h-[65px]">
      <GiHamburgerMenu
        className="block absolute right-3 lg:hidden cursor-pointer text-[1.4rem]"
        onClick={toggleMenu}
      />
      <div className="flex w-full justify-between items-center px-4 lg:px-20">
        <img
          src={CompanyLogo}
          className="object-contain w-14"
          alt="Logo Loading..."
        />

        <DesktopNav links={links} />

        {user ? (
          <UserSection
            user={user}
            miniMenu={miniMenu}
            toggleMiniMenu={toggleMiniMenu}
            handleLogout={handleLogout}
          />
        ) : (
          <AuthButtons />
        )}
      </div>

      <MobileMenu
        user={user}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        links={links}
        handleLogout={handleLogout}
      />
    </nav>
  );
}

const UserSection = ({ user, miniMenu, toggleMiniMenu, handleLogout }) => {
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (miniMenu) toggleMiniMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [miniMenu, toggleMiniMenu]);

  return (
    <div ref={menuRef}>
      <div className="hidden lg:flex items-center justify-center gap-2">
        <Link to="about/user">
          <div className="group relative">
            <img
              className="w-9 h-9 rounded-full border-[3px] border-gray-400 hover:border-blue-400"
              src={
                user?.avatar ||
                "https://cdn-icons-png.flaticon.com/512/147/147142.png"
              }
              alt="User"
            />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              View Profile
            </div>
          </div>
        </Link>
        {miniMenu ? (
          <RxCross2
            className="block cursor-pointer size-8 hover:text-[var(--ternery)] hover:bg-gray-200 rounded-full p-1 transition-transform duration-300"
            onClick={toggleMiniMenu}
          />
        ) : (
          <BsThreeDotsVertical
            className="block cursor-pointer size-8 hover:text-[var(--ternery)] hover:bg-gray-200 rounded-full p-1 transition-transform duration-300"
            onClick={toggleMiniMenu}
          />
        )}
      </div>
      <UserMenu user={user} miniMenu={miniMenu} handleLogout={handleLogout} />
    </div>
  );
};

const AuthButtons = () => (
  <div className="flex gap-2">
    <Link to="/auth/sign-up">
      <button className="hidden lg:flex bg-white items-center gap-1 rounded-[5px] shadow-[0_2px_0_0_rgba(0,0,0,0.04),_inset_0_0_0_2px_#e0e0e0] transition-all ease-in-out duration-600 text-gray-900 px-3 py-2 text-xs leading-[1.32] hover:bg-[#f2f6ff]">
        <span>Sign Up</span>
        <FaArrowRightLong />
      </button>
    </Link>
    <Link to="/auth/sign-in">
      <button className="hidden lg:flex bg-black items-center gap-1 rounded-[5px] transition-all ease-in-out duration-600 text-white px-3 py-2 text-xs leading-[1.32] hover:bg-[#15264e]">
        <span>Login</span>
        <FaArrowRightLong />
      </button>
    </Link>
  </div>
);

const MobileMenu = ({ user, menuOpen, toggleMenu, links, handleLogout }) => {
  const [activeSublink, setActiveSublink] = useState(null);

  const toggleSublink = (index) => {
    setActiveSublink(index === activeSublink ? null : index);
  };

  return (
    <div className="block lg:hidden ">
      <ul
        className={`fixed inset-y-0 left-0 w-64 bg-[var(--white-color)] transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Close Button */}
        <RxCross2
          onClick={toggleMenu}
          className="absolute right-2 top-2 text-[var(--primary)] group-hover:text-[var(--ternery)] text-[1.2rem] cursor-pointer"
        />

        {/* User Profile Section */}
        <div className="px-4 py-1 border-b-[3px]  bg-[var(--white-color)]">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="block w-10 h-10 rounded-full bg-[var(--white-color)] overflow-hidden">
                <img
                  src={
                    user?.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/147/147142.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <span className="text-[var(--primary)] text-md ">
                  {user?.name}
                </span>
                <p className="text-[var(--primary)] text-xs">{user?.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/auth/sign-up">
                <button className="lg:hidden flex bg-white items-center gap-1 rounded-[5px] shadow-[0_2px_0_0_rgba(0,0,0,0.04),_inset_0_0_0_2px_#e0e0e0] transition-all ease-in-out duration-600 text-gray-900 px-3 py-2 text-xs leading-[1.32] hover:bg-[#f2f6ff]">
                  <span>Sign Up</span>
                  <FaArrowRightLong />
                </button>
              </Link>
              <Link to="/auth/sign-in">
                <button className="lg:hidden flex bg-black items-center gap-1 rounded-[5px] transition-all ease-in-out duration-600 text-white px-3 py-2 text-xs leading-[1.32] hover:bg-[#15264e]">
                  <span>Login</span>
                  <FaArrowRightLong />
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="px-2 bg-[var(--white-color)]">
          {links.map((link, index) => (
            <div key={link.name} className="group">
              <div
                className="w-full flex items-center gap-3 px-2 py-3 text-[var(--primary)]  cursor-pointer"
                onClick={() => toggleSublink(index)}
              >
                {link.icon}
                <NavLink
                  to={link.address}
                  className="text-sm font-medium"
                  onClick={index === 0 ? toggleMenu : undefined}
                >
                  {link.name}
                </NavLink>
                {link.sublinks && (
                  <div className="ml-auto">
                    <MdKeyboardArrowUp
                      className={`text-[var(--primary)] group-hover:text-[var(--ternery)]  size-6 ${activeSublink === index ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                )}
              </div>
              {link.sublinks && (
                <div
                  className={`pl-8 overflow-hidden transition-[max-height] duration-300 ease-in-out max-h-0 ${activeSublink === index ? "max-h-[1000px]" : ""
                    }`}
                >
                  <SubLinks sublinks={link.sublinks} toggleMenu={toggleMenu} />
                </div>
              )}
            </div>
          ))}
        </nav>
        {user && (
          <div className="group px-2 border-t-[3px] ">
            <div className="w-full flex items-center gap-3 px-2 py-3 text-[var(--primary)] cursor-pointer" onClick={() => toggleSublink('settings')}>
              <IoSettingsOutline /> <span className="text-sm font-medium">Settings</span>
              <div className="ml-auto">
                <MdKeyboardArrowUp
                  className={`text-[var(--primary)] group-hover:text-[var(--ternery)] size-6 ${activeSublink === 'settings' ? "rotate-180" : ""
                    }`}
                />
              </div>
            </div>
            <div className={`pl-8 overflow-hidden transition-[max-height] duration-300 ease-in-out max-h-0 ${activeSublink === 'settings' ? "max-h-[1000px]" : ""
              }`}>
              <ul>
                <li className="py-2">
                  <NavLink
                    to="/user/change-passowrd"
                    className="flex items-center gap-3 text-[var(--primary)] hover:text-[var(--ternery)]"
                    onClick={toggleMenu}
                  >
                    <div className="flex items-center gap-2">
                      <MdOutlinePassword /> <span className="hover:text-[var(--ternery)]">Change Password</span>
                    </div>
                  </NavLink>
                </li>
                <li className="py-2">
                  <div
                    className="flex items-center gap-3 text-[var(--primary)] hover:text-[var(--ternery)] cursor-pointer"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    <div>
                      -  <span className="hover:text-[var(--ternery)]">Logout</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

const SubLinks = ({ sublinks, toggleMenu }) => (
  <ul>
    {sublinks.map((sublink) => (
      <SubLink key={sublink.name} sublink={sublink} toggleMenu={toggleMenu} />
    ))}
  </ul>
);

const SubLink = ({ sublink, toggleMenu }) => (
  <li className="py-2">
    <NavLink
      to={sublink.address}
      className="flex items-center gap-3 text-[var(--primary)] hover:text-[var(--ternery)]"
      onClick={toggleMenu}
    >
      <div className="flex items-center gap-2">
        {sublink.icon} <span className="hover:text-[var(--ternery)]">{sublink.name}</span>
      </div>
    </NavLink>
  </li>
);
export default NavMenu;
