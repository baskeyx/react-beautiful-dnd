import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);

  const onAddItem = (event) => {
    const itemsArray = items;
    itemsArray.push({
      id: `item-${items.length+1}`,
      content: event.target.dataset.module,
    });
    setItems([...itemsArray]);
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 16,
    margin: `0 0 8px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });
  
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: 8,
    width: 250
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const itemsReordered = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(itemsReordered);
  }

  return (
    <div className="App">
        <button data-module="Hero" onClick={onAddItem}>Hero</button>
        <button data-module="Text" onClick={onAddItem}>Text</button>
        <button data-module="CTA" onClick={onAddItem}>CTA</button>
        <button data-module="Product" onClick={onAddItem}>Product</button>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
  
    </div>
  );
}

export default App;
