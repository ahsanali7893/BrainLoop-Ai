import { useState, useEffect } from 'react';

type TypingTextProps = {
  text: string;
  speed?: number; // ms per character
};

const TypingText = ({ text, speed = 30 }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    if (!text) return;
    const interval = setInterval(() => {
      setDisplayedText(prev => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <div className="whitespace-pre-line">{displayedText}</div>;
};

export default TypingText;
