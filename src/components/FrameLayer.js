const FrameLayer = ({ item }) => {
  const {
    offset,
    width,
    opacity,
    display,
    color,
  } = item;

  const frameStyle = {
    borderWidth: `${width}px`,
    borderColor: color,
    opacity,
    display: !display ? 'none' : 'block',
    width: '100%',
  };

  return (
    <div
      className="w-full h-full flex items center justify-center absolute top-0 left-0 z-[1000]"
      style={{
        padding: `${offset}%`,
        pointerEvents: 'none',
      }}
    >
      <div
        style={frameStyle}
      >
      </div>
    </div>
  );
};

export default FrameLayer;
