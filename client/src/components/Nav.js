import React, { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import UserContext from "../state/context";
import { LOGOUT_USER } from "../state/constants";
import { navigate } from "@reach/router";
const Nav = () => {
  const { currentUser, dispatch } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(
    () => {
      if (currentUser.username) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    },
    [currentUser]
  );

  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className="flex items-center justify-between flex-wrap bg-blue-dark p-6 shadow-lg"
      style={{ borderBottom: "2px solid hsl(120, 48%, 25%)" }}
    >
      <div className="flex items-center flex-no-shrink text-white mr-6">
        {/* <Link to="/"> */}
        <span className="font-semibold text-3xl tracking-tight">
          Trello-clone
        </span>
        {/* </Link> */}
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {/* <Link
            to="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
          >
            Docs
          </Link> */}
          {/* <Link
            to="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4"
          >
            Examples
          </Link> */}
          {!user && (
            <Link
              to="/login"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white"
            >
              Login
            </Link>
          )}
        </div>
        <div>
          <Link
            to="/register"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0"
          >
            {user ? (
              <span className="font-bold">{user.username}</span>
            ) : (
              "Register"
            )}
          </Link>
          {user && (
            <button
              className="inline-block btn text-sm px-4 py-2 ml-3 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
