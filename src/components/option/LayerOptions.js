import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useMapStateToArray from '../../hooks/useMapStateToArray';
import OptionHeader from '../OptionHeader';
import { reorderCanvas } from '../../redux/canvas/canvasActions';

const defaultOrder = ['author', 'quote', 'brand', 'frame', 'overlayColor', 'photo', 'baseColor'];

const Layer = ({ layer, index }) => {
  return (
    <Draggable
      draggableId={layer.id}
      index={index}
    >
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-menu text-white w-full p-2 uppercase my-1"
          >
            <span className="select-none">
              {layer.name}
            </span>
          </div>
        );
      }}
    </Draggable>
  );
};

const LayerList = ({ list }) => {
  return list.map((layer, index) => {
    return (
      <Layer
        key={layer.id}
        layer={layer}
        index={index}
      />
    );
  });
};

const LayerOptions = () => {
  const layersState = useSelector((state) => state.layer);
  const layerOrder = useSelector((state) => state.canvas.order); // order berdasarkan ini
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const [order, setOrder] = useState(layerOrder);

  const sort = (order) => {
    const arr = [];
    for (let i = 0; i < order.length; i += 1) {
      arr.push(layersState[order[i]]);
    }
    setList(arr);
  };

  useEffect(() => {
    sort(layerOrder);
  }, []);

  const handleDragEnd = (result, dar) => {
    const { destination, source, draggableId } = result;

    if(!destination)return null;

    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return null;
    }

    // Copy order
    const newLayerOrder = [...layerOrder];
    newLayerOrder.splice(source.index, 1);
    newLayerOrder.splice(destination.index, 0, draggableId);

    dispatch(reorderCanvas(newLayerOrder));
    sort(newLayerOrder);
  };

  const resetOrder = () => {
    dispatch(reorderCanvas(defaultOrder));
    sort(defaultOrder);
  };

  return (
    <div className="custom-scrollbar w-full h-full flex flex-col items-center overflow-y-scroll overflow-x-hidden">
      <div className="px-5 w-full flex items-center flex-col">
        <OptionHeader title="Layer" />
        <button
          onClick={resetOrder}
          className="mb-2 p-2 rounded-lg bg-purple-500 text-white w-full"
        >
          Reset
        </button>
        <DragDropContext
          onDragEnd={handleDragEnd}
        >
          <Droppable droppableId="layerOrder">
            {
              (provided) => {
                return(
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-full pb-20"
                  >
                    <LayerList list={list} />
                    {provided.placeholder}
                  </div>
                );
              }
            }
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default LayerOptions;
