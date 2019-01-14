import React from "react";
import styled from "styled-components";
import Task from "./Task";
import TaskList from "./TaskList";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, task }) => (
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
        </TaskList>
      )}
    </Droppable>
  </Container>
);
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

// const TaskList = styled("div")`
//   padding: 1em;
// `;
