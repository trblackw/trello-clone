import React, { useContext, useEffect, useState } from "react";
import UserContext from "../state/context";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import useToggle from "../hooks/useToggle";
import Modal from "./Modal";
import { Link } from "@reach/router";
import AddBoard from "./AddBoard";
import { fetchBoards } from "../state/actions/board_actions";

const Dashboard = ({ uri }) => {
  const { currentUser, boards, dispatch } = useContext(UserContext);
  const [open, setOpen] = useToggle(false);
  const [on, setOn] = useToggle(false);

  useEffect(
    () => {
      fetchBoards(currentUser, dispatch);
    },
    [boards.length]
  );

  return (
    <DashContainer id="dashboard">
      <Sidebar pageWrapId="dash-view" outerContainerId="dashboard" />
      <div id="dash-view">
        <DashHeader className="w-full max-w-md rounded border shadow-lg bg-blue-lighter">
          <h1 className="text-blue-darker">
            Welcome back {currentUser.username}
          </h1>
        </DashHeader>
        <label htmlFor="boards" className="text-2xl font-thin">
          {currentUser.organization}'s Boards
        </label>
        <br />
        <button
          className="bg-blue mx-auto mt-2 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
          onClick={() => setOpen(true)}
        >
          Create new board
        </button>
        {open && (
          <Modal toggle={setOpen} open={open}>
            <AddBoard toggle={setOpen} />
          </Modal>
        )}
        <BoardContainer className="max-w-lg" id="boards">
          <Boards>
            {!boards.length ? (
              <div>No boards to display</div>
            ) : (
              boards.map(board =>
                board.columns.map(({ title, _id, category, tasks }) => (
                  <Link to={`${uri}/${board._id}`} key={_id}>
                    <div className="board border shadow-md mx-2 p-6">
                      <h4 className="text-blue font-bold">{title}</h4>
                      <p>{category}</p>
                      <br />
                      <span className="font-thin">
                        Open Tasks: {tasks.length}
                      </span>
                      <button className="bg-blue-light hover:bg-blue-dark text-white font-semibold py-1 px-2 border border-blue rounded shadow">
                        view
                      </button>
                    </div>
                  </Link>
                ))
              )
            )}
            {/* 
            <div className="board border shadow-md mx-2 p-6">
              <code className="mb-2" className="text-blue">
                Board title
              </code>
              <br />
              <label htmlFor="contributers">Contributers</label>
              <ul className="contributers list-reset p-2 ml-2">
                <li>
                  <code>contributer</code>
                </li>
                <li>
                  <code>contributer</code>
                </li>
                <li>
                  <code>contributer</code>
                </li>
              </ul>
            </div>
            <div className="board border shadow-md mx-2 p-6">
              <code className="text-blue">Board title</code>
              <br />

              <label htmlFor="contributers">Contributers</label>
              <ul className="contributers list-reset p-2 ml-2">
                <li>
                  <code>contributer</code>
                </li>
                <li>
                  <code>contributer</code>
                </li>
                <li>
                  <code>contributer</code>
                </li>
              </ul>
            </div> */}
          </Boards>
        </BoardContainer>
      </div>
    </DashContainer>
  );
};

export default Dashboard;

const DashContainer = styled("div")`
  border: 1px solid blue;
  height: 100vh;
  background: whitesmoke;

  #dash-view {
    text-align: center;
    overflow: auto;
  }
`;

const DashHeader = styled("div")`
  margin: 1.5em auto;
  padding: 1em;
`;

const BoardContainer = styled("div")`
  /* border: 1px solid red; */
  padding: 1.5em;
  margin: 0.5em auto 1em auto;
`;

const Boards = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 1.5em;
  /* border: 1px solid red; */
`;
