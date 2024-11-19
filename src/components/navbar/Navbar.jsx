import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/profile">My Profile</NavLink>
      </li>
    </>
  );
  return (
    <div className="w-11/12 mx-auto">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow *:font-bold"
            >
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-2xl font-semibold">
            Career
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold">{links}</ul>
        </div>
        <div className="navbar-end flex items-center space-x-2">
          <div>
            {user && user.email ? (
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button">
                  <div className="w-10 rounded-full">
                    <img
                      className="rounded-full"
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content menu rounded-box z-[1] w-52 p-4 shadow bg-orange-50"
                >
                  <p>{user.displayName}</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            {user && user.email ? (
              <button
                onClick={logOut}
                className="btn btn-neutral rounded-none font-semibold"
              >
                LogOut
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="btn btn-neutral rounded-none font-semibold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
