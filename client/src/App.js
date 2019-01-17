import React, { useContext, useReducer } from "react";
import { Router } from "@reach/router";
import Login from "./components/Login";
import UserContext from "./state/context";
import UserReducer from "./state/reducer";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Board from "./components/Board";
const App = () => {
  const initialState = useContext(UserContext);
  const [{ currentUser, boards }, dispatch] = useReducer(
    UserReducer,
    initialState
  );
  return (
    <>
      <UserContext.Provider value={{ currentUser, boards, dispatch }}>
        <Nav />
        <Router>
          <Login path="/" />
          <Register path="/register" />
          <Dashboard path="/user/:id" />
          <Board path="/user/:id/:boardId" />
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
