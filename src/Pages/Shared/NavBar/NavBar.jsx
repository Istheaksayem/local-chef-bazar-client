import React from 'react';
import Logo from '../../../Component/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import userIcon from '../../../assets/user.png';

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().catch(console.log);
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/meals">Meals</NavLink></li>
      {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <Logo />
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-3">

        {/* USER ICON (ALL DEVICES) */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <img
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-400"
              src={user?.photoURL || userIcon}
              alt="User Avatar"
            />
          </div>

          {/* DROPDOWN ONLY FOR SMALL DEVICES */}
          <ul className="dropdown-content menu bg-base-100 rounded-box shadow mt-3 w-40 lg:hidden">
            {!user ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            ) : (
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            )}
          </ul>
        </div>

        {/* BUTTONS ONLY FOR LARGE DEVICES */}
        <div className="hidden lg:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-active btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn btn-active btn-accent">
                Register
              </Link>
            </>
          ) : (
            <button onClick={handleLogOut} className="btn">
              Log Out
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default NavBar;
