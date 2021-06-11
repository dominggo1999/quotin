import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hotkeyToggleOption } from '../redux/sidebar/sidebarActions';

const GlobalHotkey = () => {
  const dispatch = useDispatch();

  const toggleOption = (e) => {
    if(e.key === '/' && e.ctrlKey) {
      dispatch(hotkeyToggleOption());
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', toggleOption);
    return () => {
      window.removeEventListener('keydown', toggleOption);
    };
  }, []);

  return null;
};

export default GlobalHotkey;
