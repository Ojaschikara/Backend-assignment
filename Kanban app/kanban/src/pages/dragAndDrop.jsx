import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Flex, Text } from '@chakra-ui/react';



const TodoCard = ({ task }) => (
  <Box p={4} bg="teal.100" borderRadius="md" mb={2}>
    <Text>{task.content}</Text>
  </Box>
);

const DroppableBox = ({ tasks, droppableId }) => (
  <Droppable droppableId={droppableId}>
    {(provided, snapshot) => (
      <Box
        ref={provided.innerRef}
        bg={snapshot.isDraggingOver ? 'blue.100' : 'gray.100'}
        p={4}
        borderRadius="md"
        minHeight="150px"
        {...provided.droppableProps}
      >
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                mb={2}
              >
                <TodoCard task={task} />
              </Box>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </Box>
    )}
  </Droppable>
);

export default function DragAndDropTodo() {
  const [tasks, setTasks] = useState(initialTasks);
  const [completedTasks, setCompletedTasks] = useState([]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination, do nothing
    if (!destination) return;

    // If dropped in the same place, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    let newSourceTasks = [...tasks];
    let newDestTasks = [...completedTasks];

    if (source.droppableId === 'Tasks') {
      const [movedTask] = newSourceTasks.splice(source.index, 1);
      if (destination.droppableId === 'CompletedTasks') {
        newDestTasks.splice(destination.index, 0, movedTask);
      } else {
        newSourceTasks.splice(destination.index, 0, movedTask);
      }
    } else if (source.droppableId === 'CompletedTasks') {
      const [movedTask] = newDestTasks.splice(source.index, 1);
      if (destination.droppableId === 'Tasks') {
        newSourceTasks.splice(destination.index, 0, movedTask);
      } else {
        newDestTasks.splice(destination.index, 0, movedTask);
      }
    }

    setTasks(newSourceTasks);
    setCompletedTasks(newDestTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex justifyContent="space-around" p={4}>
        <Box width="45%">
          <Text fontSize="xl" mb={4}>Todo List</Text>
          <DroppableBox tasks={tasks} droppableId="Tasks" />
        </Box>

        <Box width="45%">
          <Text fontSize="xl" mb={4}>Completed Tasks</Text>
          <DroppableBox tasks={completedTasks} droppableId="CompletedTasks" />
        </Box>
      </Flex>
    </DragDropContext>
  );
}
