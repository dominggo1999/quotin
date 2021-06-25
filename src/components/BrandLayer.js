import { brandData } from '../data/brandData';
import useBrandIcon from '../hooks/useBrandIcon';
import useBrandPosition from '../hooks/useBrandPosition';
import useLayerOrder from '../hooks/useLayerOrder';

const BrandLayer = ({ item }) => {
  const {
    text, display, icon, opacity, position, size, color, name,
  } = item;

  const zIndex = useLayerOrder(name);

  const style = {
    color,
    opacity,
    fontSize: `${size}px`,
    zIndex,
  };

  // Icon component
  const Icon = useBrandIcon(icon, brandData);
  const [horizontal, vertical] = useBrandPosition(position);

  if(!display) {
    return null;
  }

  return (
    <div
      style={style}
      className="w-full h-full absolute top-0 left-0  p-3 pointer-events-none"
    >
      <div
        style={{
          justifyContent: horizontal,
          alignItems: vertical,
        }}
        className="flex h-full w-full"
      >
        <span
          className="flex items-center"
        >
          <Icon />
          <span className="text pl-1">
            {item.text}
          </span>
        </span>
      </div>
    </div>
  );
};

export default BrandLayer;
