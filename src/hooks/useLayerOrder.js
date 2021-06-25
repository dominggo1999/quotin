import { useSelector } from 'react-redux';

const useLayerOrder = (name) => {
  const order = useSelector((state) => state.canvas.order);
  const a = order.length;

  const index = order.indexOf(name);

  return (-(index - 6) * 10 + 50);
};

export default useLayerOrder;
