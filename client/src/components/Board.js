import React, { useContext, useState, useEffect } from "react";
import UserContext from "../state/context";
import initialData from "./drag&drop/data";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./drag&drop/Column";
import styled from "styled-components";
import { onDragEnd, onDragStart, onDragUpdate } from "./drag&drop/utils";

const Board = ({ boardId }) => {
  const { currentUser, boards, dispatch } = useContext(UserContext);
  const [state, setState] = useState(initialData);
  const [board, setBoard] = useState({});

  useEffect(() => {
    let board = boards.find(board => board._id === boardId);
    setBoard(board);
  }, []);

  return (
    <>
      <Header className="container p-3 mb-10">
        <header className="mt-2 mx-auto max-w-sm float-left mb-5">
          <h3 className="text-2xl text-blue font-thin">
            Welcome back,{" "}
            <span className="font-bold">{currentUser.username}</span>
          </h3>
        </header>
      </Header>
      <BoardContainer className="border-solid border-blue">
        <DragDropContext
          onDragEnd={result => onDragEnd(result, state, setState)}
          onDragUpdate={destination => onDragUpdate(destination, state)}
          onDragStart={onDragStart}
        >
          {state.columnOrder.map(colId => {
            const column = state.columns[colId];
            const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
            return <Column key={column.id} column={column} task={tasks} />;
          })}
        </DragDropContext>
      </BoardContainer>
    </>
  );
};

export default Board;

const BoardContainer = styled("div")`
  padding: 1em;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
`;

const Header = styled("div")`
  margin: 0 2em;
  width: auto;
  padding: 0;
`;
