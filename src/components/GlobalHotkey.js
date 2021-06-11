import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hotkeyToggleOption, showOption } from '../redux/sidebar/sidebarActions';
import { sidebarData } from '../data/sidebarData';

const GlobalHotkey = () => {
  const dispatch = useDispatch();
  const { activeTab, displayOption } = useSelector((state) => state.sidebar);

  const initHotkey = (e) => {
    // CTRL + /
    if(e.key === '/' && e.ctrlKey) {
      dispatch(hotkeyToggleOption());
    }

    // CTRL + ArrowUp
    if(e.key === 'ArrowUp' && e.ctrlKey && displayOption) {
      let order = sidebarData.findIndex((item) => {
        return item.id === activeTab;
      });

      if(order !== 0) {
        order -= 1;

        dispatch(showOption(sidebarData[order].id));
      }
    }

    // CTRL + ArrowDown
    if(e.key === 'ArrowDown' && e.ctrlKey && displayOption) {
      let order = sidebarData.findIndex((item) => {
        return item.id === activeTab;
      });

      if(order < sidebarData.length - 1) {
        order += 1;

        dispatch(showOption(sidebarData[order].id));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', initHotkey);
    return () => {
      window.removeEventListener('keydown', initHotkey);
    };
  }, [activeTab]);

  return null;
};

export default GlobalHotkey;
