import { useSelector, useDispatch } from 'react-redux';
import QuickOptions from './option/QuickOptions';
import BackgroundOptions from './option/BackgroundOptions';
import BrandOptions from './option/BrandOptions';
import FrameOptions from './option/FrameOptions';
import LayerOptions from './option/LayerOptions';
import QuoteOptions from './option/QuoteOptions';
import StickerOptions from './option/StickerOptions';
import AuthorOptions from './option/AuthorOptions';

const EditorOption = () => {
  const { activeTab, displayOption } = useSelector((state) => state.sidebar);

  switch (activeTab) {
    case 'quick':
      return <QuickOptions />;

    case 'background':
      return <BackgroundOptions />;

    case 'brand':
      return <BrandOptions />;

    case 'frame':
      return <FrameOptions />;

    case 'layer':
      return <LayerOptions />;

    case 'quote':
      return <QuoteOptions />;

    case 'sticker':
      return <StickerOptions />;

    case 'author':
      return <AuthorOptions />;

    default:
      return <QuickOptions />;
  }
};

export default EditorOption;
