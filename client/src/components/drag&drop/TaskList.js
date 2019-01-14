import React from "react";
import styled from "styled-components";

const TaskList = ({ provided, innerRef, children, isDraggingOver }) => {
  return (
    <Container
      {...provided.droppableProps}
      ref={innerRef}
      isDraggingOver={isDraggingOver}
      className={isDraggingOver ? "border border-blue-dark bg-blue p-3" : "p-3"}
    >
      {children}
    </Container>
  );
};

export default TaskList;

const Container = styled("div")`
  padding: 8px;
  flex-grow: 1;
  min-height: 150px;
`;
