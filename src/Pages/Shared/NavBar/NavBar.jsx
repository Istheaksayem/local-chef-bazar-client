import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../../Component/Logo/Logo';
import useAuth from '../../../Hooks/useAuth';
import userIcon from '../../../assets/user.png';

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().catch(console.log);
  };

  // COMMON LINKS
  const publicLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/meals">Meals</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
    </>
  );

  const privateLinks = (
    <>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      {/* <li><NavLink to="/profile">Profile</NavLink></li> */}
      <li><NavLink to="/contact">Contact</NavLink></li>
    </>
  );

  return (
    <div className="w-full bg-base-100 sticky top-0 z-50 shadow">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* LEFT */}
        <div className="navbar-start">
          {/* MOBILE MENU */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>

            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
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
        <div className="navbar-end gap-3">

          {/* PROFILE DROPDOWN */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <img
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full cursor-pointer border-2"
                src={user?.photoURL || userIcon}
                alt="User"
              />
            </div>

            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-44 mt-3">
              {!user ? (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              ) : (
                <>
                  <li className="font-semibold text-center cursor-default">
                    {user?.displayName || 'User'}
                  </li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* DESKTOP AUTH BUTTONS */}
          <div className="hidden lg:flex gap-2">
            {!user && (
              <>
                <Link to="/login" className="btn btn-secondary btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-accent btn-sm">
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default NavBar;
