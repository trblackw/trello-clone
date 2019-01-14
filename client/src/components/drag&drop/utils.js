export const onDragUpdate = (destination, state) => {
  const opacity = destination
    ? destination.index / Object.keys(state.tasks).length
    : 0;
  document.body.style.backgroundColor = `rgba(65, 105, 225, ${opacity})`;
};

export const onDragStart = () => {
  document.body.style.transition = "background-color 0.2s ease";
};

export const onDragEnd = (result, state, setState) => {
  const { destination, source, draggableId } = result;
  document.body.style.backgroundColor = "inherit";
  if (!destination) return;

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;

  const start = state.columns[source.droppableId];
  const finish = state.columns[destination.droppableId];
  if (start === finish) {
    const newTaskIds = [...start.taskIds];
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      taskIds: newTaskIds
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn
      }
    };
    return setState(newState);
  }
  //moving from one column to another
  const startTaskIds = [...start.taskIds];
  startTaskIds.splice(source.index, 1);
  const newStart = {
    ...start,
    taskIds: startTaskIds
  };
  const finishTaskIds = [...finish.taskIds];
  finishTaskIds.splice(destination.index, 0, draggableId);
  const newFinish = {
    ...finish,
    taskIds: finishTaskIds
  };

  const newState = {
    ...state,
    columns: {
      ...state.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    }
  };
  return setState(newState);
};
