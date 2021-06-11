import { useState, useRef } from 'react';

const TextContentControl = ({
  changeContent, changeText, text,
}) => {
  const handleChange = (e) => {
    let str = (e.target.value);
    changeText(str);

    // Get text (string not yet parsed to html)

    str = str.replace(/(?:\r\n|\r|\n)/g, '<br>');

    str = str.replace(/\*(.*?)\*/gi, '<span style="font-weight: bold">$1</span>');

    str = str.replace(/\_(.*?)\_/gi, '<i>$1</i>');

    // Get parsed string

    changeContent(str);
  };

  return (
    <div className="w-full flex flex-col justify-center mb-[20px]">
      <textarea
        onChange={handleChange}
        name="gew"
        id="gewagewgaew"
        cols="30"
        rows="5"
        className="w-full max-h-[200px] p-3 rounded-sm focus:outline-none"
        value={text}
      >
      </textarea>
    </div>
  );
};

export default TextContentControl;
