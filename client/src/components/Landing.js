import React, { useContext, useState } from "react";
import UserContext from "../state/context";
import initialData from "./data";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const Landing = () => {
  const { currentUser } = useContext(UserContext);
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {};
  return (
    <div className="container border-solid border-blue p-3">
      {/* <header className="p-3 mx-auto max-w-sm float-left">
          <h3 className="text-4xl text-blue font-thin">Welcome back, <span className="font-bold">{currentUser.username}</span></h3> 
        </header> */}
      <DragDropContext onDragEnd={onDragEnd}>
        {state.columnOrder.map(colId => {
          const column = state.columns[colId];
          const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
          return <Column key={column.id} column={column} task={tasks} />;
        })}
      </DragDropContext>
    </div>
  );
};

export default Landing;
