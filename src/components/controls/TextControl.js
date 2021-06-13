import { useState, useRef, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HexColorPicker } from 'react-colorful';
import { modifyLayerText, updateLayerLayout } from '../../redux/layer/layerActions';
import pixelToNumber from '../../util/pixelToNumber';
import OptionHeader from '../OptionHeader';

const TextControl = ({
  name, lineHeight, fontSize, canvasSize, width, height, text, uppercase, shadow, highlightColor, textColor, letterSpacing,
}) => {
  const [selectedText, setSelectedText] = useState(null);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightColorPicker, setShowHighlightColorPicker] = useState(false);
  const textAreaRef = useRef(null);
  const textColorPicker = useRef(null);
  const highlightColorPicker = useRef(null);

  const colorPickerStyle = {
    position: 'absolute',
    top: '30px',
    padding: '10px',
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 0 0 1px rgb(99 114 130 / 16%), 0 8px 16px rgb(27 39 51 / 8%)',
    zIndex: 100,
  };

  useEffect(() => {
    const textArea = textAreaRef.current;

    const reset = (e) => {
      if(e.target !== textArea) {
        setSelectedText(null);
      }
    };

    document.body.addEventListener('click', reset);
    return () => {
      document.body.removeEventListener('click', reset);
    };
  }, []);

  const dispatch = useDispatch();

  const updateText = (option, value) => {
    dispatch(modifyLayerText(name, option, value));
  };

  const updateLayout = (option, value) => {
    dispatch(updateLayerLayout(name, option, value));
  };

  const centerX = () => {
    const formatWidth = pixelToNumber(width);
    const newX = (canvasSize.width - formatWidth) / 2;

    updateLayout('x', newX);
  };

  const centerY = () => {
    const formatHeight = pixelToNumber(height);
    const newY = (canvasSize.height - formatHeight) / 2;

    updateLayout('y', newY);
  };

  const centerXY = () => {
    centerX();
    centerY();
  };

  const changeFontSize = (e) => {
    const int = parseInt(e.target.value, 10);
    updateText('fontSize', int);
  };

  const changeLineHeight = (e) => {
    const int = e.target.value / 100;
    updateText('lineHeight', int);
  };

  const changeLetterSpacing = (e) => {
    const int = e.target.value / 100;
    updateText('letterSpacing', int);
  };

  const alignText = (direction) => {
    updateText('textAlignment', direction);
  };

  const toggleUppercase = (value) => {
    updateText('uppercase', value);
  };

  const toggleShadow = (value) => {
    updateText('shadow', value);
  };

  const parseInput = (inputText) => {
    // Sanitize from html tah
    inputText = inputText.replace(/(<([^>]+)>)/ig, '');

    // Get text (string not yet parsed to html)
    inputText = inputText.replace(/(?:\r\n|\r|\n)/g, '<br>');

    inputText = inputText.replace(/\*(.*?)\*/gi, `<span style="color:${highlightColor};" class="highlight">$1</span>`);

    inputText = inputText.replace(/\$(.*?)\$/gi, '<b>$1</b>');

    inputText = inputText.replace(/\_(.*?)\_/gi, '<i>$1</i>');

    return inputText;
  };

  const handleChange = (e) => {
    let str = (e.target.value);
    dispatch(modifyLayerText(name, 'text', str));

    str = parseInput(str);

    // Get parsed string
    dispatch(modifyLayerText(name, 'content', str));
  };

  const watchSelect = (e) => {
    const textareaVal = textAreaRef.current.value;

    const cursorStart = textAreaRef.current.selectionStart;
    const cursorEnd = textAreaRef.current.selectionEnd;

    if(cursorEnd !== cursorStart) {
      setSelectedText({
        start: cursorStart,
        end: cursorEnd,
      });
    }
  };

  const addVariant = (symbol) => {
    if(selectedText) {
      const value = textAreaRef.current.value;
      const valueArr = value.split('');

      let left = valueArr.slice(0, selectedText.start).join('');
      let right = valueArr.slice(selectedText.end, valueArr.length).join('');

      let toChange = value.substring(selectedText.start, selectedText.end);

      if(toChange[0] === ' ') {
        left += ' ';
      }
      if(toChange[toChange.length - 1] === ' ') {
        right = ` ${right}`;
      }

      toChange = toChange.trim();

      let newValue = `${left}${symbol}${toChange}${symbol}${right}`;

      dispatch(modifyLayerText(name, 'text', newValue));

      newValue = parseInput(newValue);

      // Get parsed string
      dispatch(modifyLayerText(name, 'content', newValue));
    }

    setSelectedText(null);
  };

  const toggleTextColorPicker = () => {
    setShowTextColorPicker((prev) => {
      return !prev;
    });

    setShowHighlightColorPicker(false);
  };

  const toggleHighlightColor = () => {
    setShowHighlightColorPicker((prev) => {
      return !prev;
    });
    setShowTextColorPicker(false);
  };

  const changeColor = (option, color) => {
    updateText(option, color);

    if(option === 'highlightColor') {
      const highlightedText = document.querySelectorAll('.highlight');
      const newStr = parseInput(text);
      dispatch(modifyLayerText(name, 'content', newStr));
    }
  };

  return (
    <div className="w-full flex flex-col pb-10">
      <OptionHeader title={name} />
      <div className="w-full flex flex-col justify-center mb-[20px]">
        <textarea
          ref={textAreaRef}
          onChange={handleChange}
          onClick={watchSelect}
          onDoubleClick={watchSelect}
          name="gew"
          id="gewagewgaew"
          cols="30"
          rows="5"
          className="w-full max-h-[200px] p-3 rounded-sm focus:outline-none"
          value={text}
        >
        </textarea>
      </div>
      <div className="color mb-5">
        <p className="text-white">Text Color</p>
        <div className="relative">
          <div
            style={{
              backgroundColor: textColor,
            }}
            role="button"
            onClick={toggleTextColorPicker}
            className="w-1/2 h-[20px] relative z-10"
          >
          </div>
          {showTextColorPicker
            && (
              <div>
                <HexColorPicker
                  style={colorPickerStyle}
                  color={textColor}
                  onChange={(e) => changeColor('textColor', e)}
                />
              </div>
            )}
        </div>
      </div>

      <div className="color mb-5">
        <p className="text-white">Highlight Color</p>
        <div className="relative">
          <div
            style={{
              backgroundColor: highlightColor,
            }}
            role="button"
            onClick={toggleHighlightColor}
            className="w-1/2 h-[20px] relative z-10"
          >
          </div>
          {showHighlightColorPicker
            && (
              <div>
                <HexColorPicker
                  style={colorPickerStyle}
                  color={highlightColor}
                  onChange={(e) => changeColor('highlightColor', e)}
                />
              </div>
            )}
        </div>
      </div>

      <button
        onClick={() => addVariant('*')}
        className="bg-green-600 text-white mb-5"
      >Higlight
      </button>
      <button
        onClick={() => addVariant('_')}
        className="bg-green-600 text-white mb-5"
      >Italic
      </button>
      <button
        onClick={() => addVariant('$')}
        className="bg-green-600 text-white mb-5"
      >Bold
      </button>
      {
        shadow ? (
          <button
            onClick={(e) => toggleShadow(false)}
            className="bg-yellow-700 text-white mb-5"
          >No Text Shadow
          </button>
        )
          : (
            <button
              onClick={(e) => toggleShadow(true)}
              className="bg-yellow-700 text-white mb-5"
            >Text Shadow
            </button>
          )
      }

      {
        uppercase ? (
          <button
            onClick={(e) => toggleUppercase(false)}
            className="bg-yellow-700 text-white mb-5"
          >Case Normal
          </button>
        )
          : (
            <button
              onClick={(e) => toggleUppercase(true)}
              className="bg-yellow-700 text-white mb-5"
            >Uppercase
            </button>
          )
      }

      <button
        onClick={(e) => alignText('left')}
        className="bg-red-700 text-white mb-5"
      >Align Text Left
      </button>
      <button
        onClick={(e) => alignText('right')}
        className="bg-red-700 text-white mb-5"
      >Align Text Right
      </button>
      <button
        onClick={(e) => alignText('center')}
        className="bg-red-700 text-white mb-5"
      >Align Text Center
      </button>
      <button
        onClick={(e) => alignText('justify')}
        className="bg-red-700 text-white mb-5"
      >Align Text Justify
      </button>
      <button
        onClick={centerX}
        className="bg-black text-white mb-5"
      >Horizontal alignment
      </button>
      <button
        onClick={centerY}
        className="bg-black text-white mb-5"
      >Vertical alignment
      </button>
      <button
        onClick={centerXY}
        className="bg-black text-white mb-5"
      >Center alignment
      </button>
      <p className="text-white text-center">{fontSize}</p>
      <input
        type="range"
        min="10"
        max="100"
        onInput={changeFontSize}
        value={fontSize}
      />
      <p>Font size</p>

      <p className="text-white text-center">{lineHeight}</p>
      <input
        type="range"
        min="50"
        max="200"
        onInput={changeLineHeight}
        value={lineHeight * 100}
      />
      <p>Line height</p>

      <p className="text-white text-center">{letterSpacing}</p>

      <input
        type="range"
        min="0"
        max="100"
        onInput={changeLetterSpacing}
        value={letterSpacing * 100}
      />
      <p>Letter height</p>
    </div>
  );
};

export default TextControl;
