const EditorTabItem = ({
  title, SVG, changeActiveTab, id, activeTab,
}) => {
  const isActive = activeTab === id ? 'bg-tab-active' : 'bg-none';

  return (
    <li
      onClick={() => changeActiveTab(id)}
      className={`flex flex-col items-center justify-center text-center px-1 py-3  cursor-pointer ${isActive}`}
    >
      <SVG
        width="25"
        height="25"
        className="fill-current mb-2"
      />
      <p className="text-sm ">{title}</p>
    </li>
  );
};

export default EditorTabItem;
