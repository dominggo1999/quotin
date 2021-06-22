import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { createClient } from 'pexels';
import { Rnd } from 'react-rnd';

const apiKey = process.env.REACT_APP_PEXELS_API;
const client = createClient(apiKey);

const PhotoLayer = ({ item, canvasSize }) => {
  const [imageURL, setImageURL] = useState('');
  const [boundaryWidth, setBoundaryWidth] = useState();
  const [boundaryHeight, setBoundaryHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [imageHeight, setImageHeight] = useState();
  const { imageID } = item;

  useEffect(() => {
    const getImage = async () => {
      const response = await client.photos.show({ id: imageID });
      setImageURL(response.src.large2x);

      const { height, width } = response;

      const imageAspectRatio = width / height;
      const canvasAspectRatio = canvasSize.width / canvasSize.height;

      if(imageAspectRatio < canvasAspectRatio) {
        // h nya image > h nya canvas
        // draggable axis = y
        const hImage = canvasSize.width / imageAspectRatio;
        const hBoundary = hImage + hImage - canvasSize.height;
        setBoundaryHeight(hBoundary);
        setBoundaryWidth('100%');
        setImageHeight(hImage);
        setImageWidth(canvasSize.width);
      }else{
        // h nya image < h nya canvas
        // draggable axis = y
        const hImage = canvasSize.height;
        const wImage = imageAspectRatio * hImage;
        const wBoundary = wImage + wImage - canvasSize.width;
        setBoundaryHeight('100%');
        setBoundaryWidth(wBoundary);
        setImageHeight(hImage);
        setImageWidth(wImage);
      }
    };

    getImage();
  }, [imageID]);

  return (
    <div
      style={{
        ...canvasSize,
        position: 'relative',
        zIndex: 40,
      }}
    >
      <div
        id="photoBoundary"
        style={{
          width: boundaryWidth,
          height: boundaryHeight,
          // background: 'red',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {
        imageURL && (
        <Rnd
          bounds="#photoBoundary"
          default={{
            x: 0,
            y: 0,
          }}
        >
          <img
            src={imageURL}
            alt="Background"
            draggable={false}
            style={{
              height: imageHeight,
              width: imageWidth,
              maxWidth: 'none',
            }}
            className="object-cover z-[45]"
          />
        </Rnd>
        )
      }
    </div>
  );
};

export default PhotoLayer;
