import React from "react";
import styled from "styled-components";
import Task from "./Task";
import TaskList from "./TaskList";
import AddTask from "../AddTask";
import useToggle from "../../hooks/useToggle";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, task }) => {
  const [open, setOpen] = useToggle(false);
  return (
    <Container className="bg-blue-light rounded">
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            provided={provided}
            innerRef={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {task.map((task, index) => (
              <Task key={index} task={task} index={index} />
            ))}
            {provided.placeholder}
            <AddTaskContainer>
              <button
                className="bg-green hover:bg-green-light text-white font-semibold hover:text-white py-2 px-4 ml-4 border shadow border-green-dark hover:border-transparent rounded flex"
                onClick={() => setOpen(true)}
              >
                <img src="https:icon.now.sh/plus/fff" alt="plus icon" />
                <span>Add task</span>
              </button>
              {open && <AddTask setOpen={setOpen} />}
            </AddTaskContainer>
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};
export default Column;

const Container = styled("div")`
  margin: 1em;
  border: 1px solid lightgray;
  color: whitesmoke;
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const Title = styled("h3")`
  padding: 1em;
  font-size: 1.5em;
`;

const AddTaskContainer = styled("div")`
  border-radius: 5px;
  width: 100%;
  margin-bottom: 0.5em;

  span {
    margin-left: 0.5em;
  }
`;
