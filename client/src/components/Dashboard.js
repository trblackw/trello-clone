import React, { useContext, useEffect } from "react";
import UserContext from "../state/context";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    console.log(currentUser);
  }, []);
  return (
    <DashContainer id="dashboard">
      <Sidebar pageWrapId="dash-view" outerContainerId="dashboard" />
      <div id="dash-view">
        <DashHeader className="w-full max-w-md rounded border shadow-lg">
          <h1 className="text-blue-darker">
            Welcome back {currentUser.username}
          </h1>
          <h2>Check out our offerings in the sidebar!</h2>
        </DashHeader>
      </div>
    </DashContainer>
  );
};

export default Dashboard;

const DashContainer = styled("div")`
  border: 1px solid blue;
  height: 100vh;

  #dash-view {
    text-align: center;
    overflow: auto;
  }
`;

const DashHeader = styled("div")`
  margin: 1.5em auto;
  padding: 1em;
  background: whitesmoke;
  color: black;
`;

// const Sidebar = styled("div")`
//   background: whitesmoke;
//   display: flex;
//   flex-direction: column;
//   width: 300px;
//   padding: 1em;
//   float: left;

//   ul {
//     list-style: none;
//   }
// `;

// const BoardContainer = styled("div")`
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: row;
//   padding: 1em;
// `;
