'use client';

import { useEffect, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

type GlitchTextProps = { text: string; trigger: number; className?: string };

export const GlitchText = ({ text, trigger, className = '' }: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    setIsGlitching(true);
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((character, index) => index < iterations ? character : CHARS[Math.floor(Math.random() * CHARS.length)]).join(''));
      iterations += 1 / 2;
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span className={`${className} ${isGlitching ? 'opacity-80' : ''}`}>{displayText}</span>;
};
