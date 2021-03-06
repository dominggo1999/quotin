import React, { useState, useRef, useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyLayerText, updateLayerLayout } from '../../redux/layer/layerActions';
import pixelToNumber from '../../util/pixelToNumber';
import OptionHeader from '../OptionHeader';
import ColorPicker from './ColorPicker';
import TextControlButton from './TextControlButton';
import ToggleDisplay from './ToggleDisplay';
import { ReactComponent as CenterLayerIcon } from '../../assets/controls/center-center.svg';
import { ReactComponent as VerticalLayerIcon } from '../../assets/controls/vertical-align-center.svg';
import { ReactComponent as HorizontaLayerIcon } from '../../assets/controls/horizontal-align.svg';
import { ReactComponent as BoldTextIcon } from '../../assets/controls/bold.svg';
import { ReactComponent as HighlightTextIcon } from '../../assets/controls/highlighter.svg';
import { ReactComponent as ItalicTextIcon } from '../../assets/controls/italic.svg';
import { ReactComponent as UppercaseTextIcon } from '../../assets/controls/uppercase.svg';
import { ReactComponent as LowercaseTextIcon } from '../../assets/controls/lowercase.svg';
import { ReactComponent as TextShadow } from '../../assets/controls/text-shadow.svg';
import { ReactComponent as CenterTextIcon } from '../../assets/controls/center-align.svg';
import { ReactComponent as JustifyTextIcon } from '../../assets/controls/justification.svg';
import { ReactComponent as LeftTextIcon } from '../../assets/controls/left-align.svg';
import { ReactComponent as RightTextIcon } from '../../assets/controls/right-align.svg';

const TextControl = ({
  name, lineHeight, fontSize, canvasSize, width, height, text, uppercase, shadow, highlightColor, textColor, letterSpacing, quick, fontFamily, openBrowser, order, textAlignment,
}) => {
  const dispatch = useDispatch();
  const [selectedText, setSelectedText] = useState(null);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showHighlightColorPicker, setShowHighlightColorPicker] = useState(false);
  const textAreaRef = useRef(null);

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

  const parseInput = (inputText, color = highlightColor) => {
    // Sanitize from html tag
    inputText = inputText.replace(/(<([^>]+)>)/ig, '');

    // Get text (string not yet parsed to html)
    inputText = inputText.replace(/(?:\r\n|\r|\n)/g, '<br>');

    inputText = inputText.replace(/\*(.*?)\*/gi, `<span style="color:${color};" class="highlight">$1</span>`);

    inputText = inputText.replace(/\$(.*?)\$/gi, '<b>$1</b>');

    inputText = inputText.replace(/\_(.*?)\_/gi, '<i>$1</i>');

    return inputText;
  };

  const handleChange = (e) => {
    let str = (e.target.value);
    dispatch(modifyLayerText(name, 'text', str));

    str = parseInput(str);

    // Set selected text to null
    setSelectedText(null);

    // Get parsed string
    dispatch(modifyLayerText(name, 'content', str));
  };

  const watchSelect = (e) => {
    const cursorStart = textAreaRef.current.selectionStart;
    const cursorEnd = textAreaRef.current.selectionEnd;

    if(cursorEnd !== cursorStart) {
      setSelectedText({
        start: cursorStart,
        end: cursorEnd,
      });
    } else{
      setSelectedText(null);
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
      const newStr = parseInput(text, color);
      dispatch(modifyLayerText(name, 'content', newStr));
    }
  };

  const o = `order-${order}`;

  return (
    <div className={`${o} w-full flex flex-col pb-6`}>
      <div className="w-full flex justify-between items-center mb-3">
        <OptionHeader title={name} />
        <ToggleDisplay name={name} />
      </div>
      {/* Text Input */}
      <div className="w-full flex flex-col justify-center mb-[20px]">
        <textarea
          ref={textAreaRef}
          onChange={handleChange}
          onSelect={watchSelect}
          name={`${name}input`}
          id={`${name}input`}
          className="w-full h-[100px] max-h-[150px] p-3 focus:outline-none"
          value={text}
        >
        </textarea>
      </div>

      <div className="flex justify-center mb-1 w-full">
        {/* Add Variant */}
        <TextControlButton
          title="Highlight"
          onClick={() => addVariant('*')}
        >
          <HighlightTextIcon />
        </TextControlButton>

        <TextControlButton
          title="Italic"
          onClick={() => addVariant('_')}
        >
          <ItalicTextIcon />
        </TextControlButton>
        <TextControlButton
          title="Bold"
          onClick={() => addVariant('$')}
        >
          <BoldTextIcon />
        </TextControlButton>

        {/* Shadow */}
        {
          shadow ? (
            <TextControlButton
              readjustSize={5}
              onClick={(e) => toggleShadow(false)}
              shadow={shadow}
              title="Remove Shadow"
            >
              <TextShadow />
            </TextControlButton>
          ) : (
            <TextControlButton
              readjustSize={5}
              shadow={shadow}
              title="Add Shadow"
              onClick={(e) => toggleShadow(true)}
            >
              <TextShadow />
            </TextControlButton>
          )
        }

        {/* Uppercase */}
        {
          uppercase ? (
            <TextControlButton
              readjustSize={5}
              onClick={(e) => toggleUppercase(false)}
              uppercase={uppercase}
              title="Lowercase"
            >
              <LowercaseTextIcon />
            </TextControlButton>
          ) : (
            <TextControlButton
              readjustSize={5}
              onClick={(e) => toggleUppercase(true)}
              uppercase={uppercase}
              title="Uppercase"
            >
              <UppercaseTextIcon />
            </TextControlButton>
          )
        }
      </div>

      {/* Text Alignment */}
      <div className="flex justify-center mb-1 w-full">
        <TextControlButton
          onClick={(e) => alignText('left')}
          textAlignment={textAlignment}
          value="left"
          title="Text Left"
        >
          <LeftTextIcon />
        </TextControlButton>
        <TextControlButton
          onClick={(e) => alignText('right')}
          textAlignment={textAlignment}
          value="right"
          title="Text Right"
        >
          <RightTextIcon />
        </TextControlButton>
        <TextControlButton
          onClick={(e) => alignText('center')}
          textAlignment={textAlignment}
          value="center"
          title="Text Center"
        >
          <CenterTextIcon />
        </TextControlButton>
        <TextControlButton
          onClick={(e) => alignText('justify')}
          textAlignment={textAlignment}
          value="justify"
          title="Text Justify"
        >
          <JustifyTextIcon />
        </TextControlButton>
      </div>

      {/* Text Alignment */}
      <div className="flex justify-center mb-1 w-full">
        <TextControlButton
          onClick={centerX}
          title="Align Horizontal"
        >
          <HorizontaLayerIcon />
        </TextControlButton>
        <TextControlButton
          onClick={centerY}
          title="Align Vertical"
        >
          <VerticalLayerIcon />
        </TextControlButton>
        <TextControlButton
          onClick={centerXY}
          title="Center"
        >
          <CenterLayerIcon />
        </TextControlButton>
      </div>

      {/* Color Picker */}
      <div className="flex w-full justify-between">

        <ColorPicker
          color={textColor}
          pickerColor={textColor}
          toggleColorPicker={toggleTextColorPicker}
          showColorPicker={showTextColorPicker}
          changeColor={(e) => changeColor('textColor', e)}
          title="Text Color"
          type="hex"
          pickerWidth="60%"
        />
        <ColorPicker
          color={highlightColor}
          pickerColor={highlightColor}
          toggleColorPicker={toggleHighlightColor}
          showColorPicker={showHighlightColorPicker}
          changeColor={(e) => changeColor('highlightColor', e)}
          title="Highlight Color"
          type="hex"
          pickerWidth="60%"
          adjustPosition="-70px"
        />
      </div>

      {
        !quick
        && (
          <>
            <div className="flex flex-col mt-5 text-white">
              <p
                className="text-center mb-2"
                style={{ fontFamily, fontSize: 25 }}
              >{fontFamily}
              </p>
              <button
                className="p-2 rounded-lg bg-purple-500"
                onClick={openBrowser}
              >Change {name} font
              </button>
            </div>
            <div className="flex w-full flex-col mt-10">
              <p className="text-white text-center mb-2">{fontSize}</p>
              <input
                className="mb-2"
                type="range"
                min="10"
                max="100"
                onInput={changeFontSize}
                value={fontSize}
              />
              <p className="text-white">Font size</p>

              <p className="text-white text-center mb-2">{lineHeight}</p>
              <input
                className="mb-2"
                type="range"
                min="50"
                max="200"
                onInput={changeLineHeight}
                value={lineHeight * 100}
              />
              <p className="text-white">Line height</p>

              <p className="text-white text-center mb-2">{letterSpacing}</p>
              <input
                className="mb-2"
                type="range"
                min="0"
                max="100"
                onInput={changeLetterSpacing}
                value={letterSpacing * 100}
              />
              <p
                className="text-white"
              >Letter spacing
              </p>
            </div>
          </>
        )
      }

    </div>
  );
};

export default TextControl;
