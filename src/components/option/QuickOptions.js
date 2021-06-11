import { useState, useRef } from 'react';

const QuickOption = () => {
  const [content, setContent] = useState('');

  const contentRef = useRef(null);

  const handleChange = (e) => {
    let str = (e.target.value);
    str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');

    str = str.replace(/\*(.*?)\*/gi, '<span style="font-weight: bold">$1</span>');

    str = str.replace(/\_(.*?)\_/gi, '<i>$1</i>');

    contentRef.current.innerHTML = str;
  };

  return (
    <div>
      <textarea
        onChange={handleChange}
        name=""
        id=""
        cols="30"
        rows="10"
        className="p-6"
      >
      </textarea>
      <div
        ref={contentRef}
        className="text-white"
      >
      </div>
    </div>
  );
};

export default QuickOption;
