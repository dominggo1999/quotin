import OptionHeader from '../OptionHeader';

const PhotoControl = ({ item, openBrowser }) => {
  return (
    <div className="order-1 w-full flex flex-col mb-10 text-white">
      <OptionHeader title="Background Photo" />
      <button
        className="p-2 rounded-lg bg-purple-500"
        onClick={openBrowser}
      >Find Photo
      </button>
    </div>
  );
};

export default PhotoControl;
