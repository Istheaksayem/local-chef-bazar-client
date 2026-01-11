import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../../Component/Logo/Logo";
import useAuth from "../../../Hooks/useAuth";
import userIcon from "../../../assets/user.png";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const [theme, setTheme] = useState("light")

  const handleLogOut = () => {
    logOut().catch(console.log);
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "hover:text-primary transition";

  // PUBLIC LINKS
  const publicLinks = (
    <>
      <li><NavLink className={navLinkStyle} to="/">Home</NavLink></li>
      <li><NavLink className={navLinkStyle} to="/meals">Meals</NavLink></li>
      <li><NavLink className={navLinkStyle} to="/about">About</NavLink></li>
    </>
  );

  // PRIVATE LINKS
  const privateLinks = (
    <>
      <li><NavLink className={navLinkStyle} to="/dashboard">Dashboard</NavLink></li>
      <li><NavLink className={navLinkStyle} to="/contact">Contact</NavLink></li>
    </>
  );

  return (
    <div className="w-full bg-base-100 text-base-content sticky top-0 z-50 shadow">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* LEFT */}
        <div className="navbar-start">
          {/* MOBILE MENU */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>

            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 text-base-content rounded-box w-52">
              {publicLinks}
              {user && privateLinks}
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost text-xl">
            <Logo />
          </Link>
        </div>

        {/* CENTER (DESKTOP) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {publicLinks}
            {user && privateLinks}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-4">

          {/* DARK MODE TOGGLE */}
          <label className="swap swap-rotate text-base-content">

            <input
              type="checkbox"
              className="toggle"
              checked={theme === "dark"}
              onChange={() => {
                const newTheme = theme === "light" ? "dark" : "light"
                setTheme(newTheme)
                document.documentElement.setAttribute("data-theme", newTheme)
              }}
            />

            {/* SUN */}
            <svg
              className="swap-on h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M5.64 17l-.71.71a1 1 0 001.41 1.41l.71-.71zM12 5a1 1 0 001-1V3a1 1 0 10-2 0v1a1 1 0 001 1z" />
            </svg>

            {/* MOON */}
            <svg
              className="swap-off h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M21.64 13a1 1 0 00-1.05-.14A8.05 8.05 0 0111.14 3.4a1 1 0 00-1.05-1.05A10 10 0 1021.64 13z" />
            </svg>
          </label>


          {/* PROFILE */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <img
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full cursor-pointer border border-base-content/20"
                src={user?.photoURL || userIcon}
                alt="User"
              />
            </div>

            <ul className="dropdown-content menu p-2 shadow bg-base-100 text-base-content rounded-box w-44 mt-3">
              {!user ? (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              ) : (
                <>
                  <li className="font-semibold text-center cursor-default">
                    {user?.displayName || "User"}
                  </li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* DESKTOP AUTH BUTTON */}
          {!user && (
            <div className="hidden lg:flex gap-2">
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-accent btn-sm">Register</Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default NavBar;
