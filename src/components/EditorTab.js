import { useState } from 'react';
import { ReactComponent as Quick } from '../assets/edit.svg';
import { ReactComponent as Quote } from '../assets/quotation.svg';
import { ReactComponent as Author } from '../assets/writer.svg';
import { ReactComponent as Background } from '../assets/background.svg';
import { ReactComponent as Sticker } from '../assets/badge.svg';
import { ReactComponent as Frame } from '../assets/display-frame.svg';
import { ReactComponent as Brand } from '../assets/id-card.svg';
import { ReactComponent as Layer } from '../assets/layer.svg';

import EditorTabItem from './EditorTabItem';

const MenuTabData = [
  {
    id: 'quick',
    title: 'Quick',
    SVG: Quick,
  },
  {
    id: 'quote',
    title: 'Quote',
    SVG: Quote,
  },
  {
    id: 'author',
    title: 'Author',
    SVG: Author,
  },
  {
    id: 'background',
    title: 'Background',
    SVG: Background,
  },
  {
    id: 'sticker',
    title: 'Sticker',
    SVG: Sticker,
  },
  {
    id: 'frame',
    title: 'Frame',
    SVG: Frame,
  },
  {
    id: 'brand',
    title: 'Brand',
    SVG: Brand,
  },
  {
    id: 'layer',
    title: 'Layer',
    SVG: Layer,
  },
];

const EditorTab = ({ title, icon }) => {
  const [activeTab, setActiveTab] = useState('quick');

  const changeActiveTab = (id) => {
    setActiveTab(id);
  };

  console.log(activeTab);

  return (
    <ul className="custom-scrollbar text-white h-full bg-menu py-10 overflow-y-scroll">
      {MenuTabData && MenuTabData.map((item) => {
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
