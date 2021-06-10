import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import EditorTabItem from './EditorTabItem';
import { sidebarData } from '../data/sidebarData';
import { setActiveTab } from '../redux/sidebar/sidebarActions';

const EditorTab = ({ title, icon }) => {
  const dispatch = useDispatch();
  const { activeTab, showOption } = useSelector((state) => state.sidebar);

  const showScrollbar = showOption ? 'custom-scrollbar' : 'no-scrollbar';

  const changeActiveTab = (id) => {
    dispatch(setActiveTab(id));
  };

  return (
    <ul className={`${showScrollbar} text-white h-full overflow-y-scroll`}>
      <div className="min-h-full bg-menu py-10 flex flex-col">
        {sidebarData && sidebarData.map((item) => {
          return (
            <EditorTabItem
              key={item.id}
              title={item.title}
              SVG={item.SVG}
              changeActiveTab={changeActiveTab}
              id={item.id}
              activeTab={activeTab}
            />
          );
        })}
      </div>
    </ul>
  );
};

export default EditorTab;
