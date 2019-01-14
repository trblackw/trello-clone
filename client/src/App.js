import React, { useContext, useReducer } from "react";
import { Router } from "@reach/router";
import Login from "./components/Login";
import Landing from "./components/Landing";
import UserContext from "./state/context";
import UserReducer from "./state/reducer";
import Nav from "./components/Nav";
import Register from "./components/Register";
const App = () => {
  const initialState = useContext(UserContext);
  const [{ currentUser }, dispatch] = useReducer(UserReducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ currentUser, dispatch }}>
        <Nav />
        <Router>
          <Login path="/" />
          <Register path="/register" />
          <Landing path="/user/:id" />
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
