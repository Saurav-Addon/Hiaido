import React, { useState, useEffect, useRef } from 'react';

const Typewriter = ({ text, className, delay = 50, cursorColor = 'orange-500' }) => {
  const textRef = useRef(null);
  const [currentChar, setCurrentChar] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true); // Start animation by default

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentChar === text.length) {
        clearInterval(interval);
        setIsAnimating(false);
        return;
      }
      setCurrentChar(currentChar + 1);
    }, delay);

    return () => clearInterval(interval);
  }, [currentChar, delay, text]);

  return (
    <div className={className}>
      <span ref={textRef}>{text.substring(0, currentChar)}</span>
      <span className={`text-${cursorColor} animate-blink`} style={{ marginLeft: '-1px' }}>|</span>
    </div>
  );
};

export default Typewriter;
