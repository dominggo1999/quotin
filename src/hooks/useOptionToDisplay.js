import QuickOptions from '../components/option/QuickOptions';
import BackgroundOptions from '../components/option/BackgroundOptions';
import BrandOptions from '../components/option/BrandOptions';
import FrameOptions from '../components/option/FrameOptions';
import LayerOptions from '../components/option/LayerOptions';
import QuoteOptions from '../components/option/QuoteOptions';
import StickerOptions from '../components/option/StickerOptions';
import AuthorOptions from '../components/option/AuthorOptions';

const useOptionToDisplay = (activeTab) => {
  let optionToDisplay;

  switch (activeTab) {
    case 'quick':
      optionToDisplay = <QuickOptions />;
      break;
    case 'background':
      optionToDisplay = <BackgroundOptions />;
      break;
    case 'brand':
      optionToDisplay = <BrandOptions />;
      break;
    case 'frame':
      optionToDisplay = <FrameOptions />;
      break;
    case 'layer':
      optionToDisplay = <LayerOptions />;
      break;
    case 'quote':
      optionToDisplay = <QuoteOptions />;
      break;
    case 'sticker':
      optionToDisplay = <StickerOptions />;
      break;
    case 'author':
      optionToDisplay = <AuthorOptions />;
      break;
    default:
      optionToDisplay = <QuickOptions />;
  }

  return optionToDisplay;
};

export default useOptionToDisplay;
