const HideOptionButton = ({ hideOption }) => {
  return (
    <div
      role="button"
      onClick={hideOption}
      className="absolute z-50 right-[-30px] top-1/2   w-[60px] h-[60px] flex justify-center items-center font-bold rounded-full cursor-pointer bg-tab-active"
    >
      <span className="inline-block px-1 text-white font-extrabold text-base">
        {'<'}
      </span>
    </div>
  );
};

export default HideOptionButton;
