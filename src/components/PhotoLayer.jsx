import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { createClient } from 'pexels';
import { Rnd } from 'react-rnd';
import { useDispatch } from 'react-redux';
import useLayerOrder from '../hooks/useLayerOrder';
import { setImageAspectRatio } from '../redux/canvas/canvasActions';
import { updateLayerLayout } from '../redux/layer/layerActions';

const apiKey = import.meta.env.VITE_APP_PEXELS_API;
const client = createClient(apiKey);

const PhotoLayer = ({ item, canvasSize }) => {
  const {
    imageID, display, name, imageX, imageY,
  } = item;
  const dispatch = useDispatch();

  const [imageURL, setImageURL] = useState('');
  const [boundaryWidth, setBoundaryWidth] = useState();
  const [boundaryHeight, setBoundaryHeight] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [imageHeight, setImageHeight] = useState();
  const [loading, setLoading] = useState(false);
  const [imageRatio, setImageRatio] = useState();
  const [x, setX] = useState(imageX);
  const [y, setY] = useState(imageY);
  const [countRender, setCountRender] = useState(0);

  const zIndex = useLayerOrder(name);

  const adjustDimension = (imageAspectRatio, canvasAspectRatio) => {
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
      // draggable axis = x
      const hImage = canvasSize.height;
      const wImage = imageAspectRatio * hImage;
      const wBoundary = wImage + wImage - canvasSize.width;
      setBoundaryHeight('100%');
      setBoundaryWidth(wBoundary);
      setImageHeight(hImage);
      setImageWidth(wImage);
    }

    // Reset position to 0,0
    setCountRender(1);
    if(countRender > 0) {
      setX(0);
      setY(0);
    }
    dispatch(updateLayerLayout('photo', 'imageX', 0));
    dispatch(updateLayerLayout('photo', 'imageY', 0));
  };

  useEffect(() => {
    const getImage = async () => {
      setLoading(true);
      const response = await client.photos.show({ id: imageID });
      setImageURL(response.src.large2x);
      setLoading(false);

      const { height, width } = response;

      const imageAspectRatio = width / height;
      const canvasAspectRatio = canvasSize.width / canvasSize.height;

      // Remember imageaspectratio
      dispatch(setImageAspectRatio(imageAspectRatio));

      // Image aspect ratio will always be the same if canvas size is changed
      setImageRatio(imageAspectRatio);

      adjustDimension(imageAspectRatio, canvasAspectRatio);
    };

    getImage();
  }, [imageID]);

  useEffect(() => {
    if(imageRatio) {
      const canvasRatio = canvasSize.width / canvasSize.height;
      adjustDimension(imageRatio, canvasRatio);
    }
  }, [canvasSize.width, canvasSize.height]);

  const enableResizing = {
    top: false,
    right: false,
    left: false,
    bottom: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
  };

  if(!display) {
    return null;
  }

  const onDragStop = (e, d) => {
    setX(d.x);
    setY(d.y);
    dispatch(updateLayerLayout('photo', 'imageX', d.x));
    dispatch(updateLayerLayout('photo', 'imageY', d.y));
  };

  return (
    <div
      style={{
        ...canvasSize,
        position: 'relative',
        zIndex,
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
        imageURL && !loading && (
        <Rnd
          bounds="#photoBoundary"
          enableResizing={enableResizing}
          position={{
            x,
            y,
          }}
          onDragStop={onDragStop}
          // default={{
          //   x: 0,
          //   y: 0,
          // }}
        >
          <LazyLoadImage
            src={imageURL}
            alt="Background"
            effect="blur"
            draggable={false} // prevent ghost image
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
