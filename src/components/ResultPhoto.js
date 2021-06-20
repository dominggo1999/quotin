import pixelToNumber from '../util/pixelToNumber';

const ResultPhoto = ({ item, canvasSize, scale }) => {
  const {
    boundaryWidth,
    boundaryHeight,
    imageWidth,
    imageHeight,
    imageURL,
    x,
    y,
  } = item;

  const tX = x * scale;
  const tY = y * scale;

  return (
    <div
      style={{
        width: canvasSize.width,
        height: canvasSize.height,
        zIndex: 40,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: boundaryWidth !== '100%' ? boundaryWidth * scale : '100%',
          height: boundaryHeight !== '100%' ? boundaryHeight * scale : '100%',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
      >
        {
        imageURL && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(${tX}px,${tY}px)`,
            }}
          >
            <img
              src={imageURL}
              alt="Background"
              draggable={false}
              style={{
                height: imageHeight !== '100%' ? imageHeight * scale : '100%',
                width: imageWidth !== '100%' ? imageWidth * scale : '100%',
                maxWidth: 'none',
              }}
              className="object-cover z-[45]"
            />
          </div>
        )
      }
      </div>
    </div>
  );
};

export default ResultPhoto;
