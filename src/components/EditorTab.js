import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import EditorTabItem from './EditorTabItem';
import { sidebarData } from '../data/sidebarData';
import { setActiveTab } from '../redux/sidebar/sidebarActions';

const EditorTab = ({ title, icon }) => {
  const dispatch = useDispatch();
  const { activeTab, showOption } = useSelector((state) => state.sidebar);

  const changeActiveTab = (id) => {
    dispatch(setActiveTab(id));
  };

  return (
    <ul className="custom-scrollbar text-white h-full bg-menu py-10 overflow-y-scroll">
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
    </ul>
  );
};

export default EditorTab;
