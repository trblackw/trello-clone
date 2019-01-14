import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;

const Container = styled("div")`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
  background: ${props =>
    props.isDragging ? "hsl(193, 54%, 85%)" : "whitesmoke"};
  color: black;
`;
