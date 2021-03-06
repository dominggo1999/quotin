import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import QuickOptions from './option/QuickOptions';
import BackgroundOptions from './option/BackgroundOptions';
import BrandOptions from './option/BrandOptions';
import FrameOptions from './option/FrameOptions';
import LayerOptions from './option/LayerOptions';
import QuoteOptions from './option/QuoteOptions';
import AuthorOptions from './option/AuthorOptions';
import CanvasOptions from './option/CanvasOptions';
import useCanvasSize from '../hooks/useCanvasSize';

const EditorOption = () => {
  const { activeTab, displayOption } = useSelector((state) => state.sidebar);
  const canvas = useSelector((state) => state.canvas);
  const canvasSize = useCanvasSize(canvas);

  switch (activeTab) {
    case 'quick':
      return <QuickOptions canvasSize={canvasSize} />;

    case 'canvas':
      return <CanvasOptions canvasSize={canvasSize} />;

    case 'background':
      return <BackgroundOptions canvasSize={canvasSize} />;

    case 'brand':
      return <BrandOptions canvasSize={canvasSize} />;

    case 'frame':
      return <FrameOptions canvasSize={canvasSize} />;

    case 'layer':
      return <LayerOptions canvasSize={canvasSize} />;

    case 'quote':
      return <QuoteOptions canvasSize={canvasSize} />;

    case 'author':
      return <AuthorOptions canvasSize={canvasSize} />;

    default:
      return <QuickOptions canvasSize={canvasSize} />;
  }
};

export default EditorOption;
