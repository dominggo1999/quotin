import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionHeader from '../OptionHeader';
import TextContentControl from '../controls/TextContentControl';
import { setQuoteContent, setQuoteText } from '../../redux/quote/quoteActions';

const QuickOption = () => {
  const dispatch = useDispatch();

  const { quoteText, quoteContent } = useSelector((state) => state.quote);

  const changeQuoteContent = (content) => {
    dispatch(setQuoteContent(content));
  };

  const changeQuoteText = (text) => {
    dispatch(setQuoteText(text));
  };

  return (
    <div className="px-5 w-full flex flex-col justify-center">
      <OptionHeader title="Quote" />
      <TextContentControl
        changeContent={changeQuoteContent}
        changeText={changeQuoteText}
        text={quoteText}
      />
    </div>
  );
};

export default QuickOption;
