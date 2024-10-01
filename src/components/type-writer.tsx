"use client";
import React from "react";

export type TypeWriterProps = {
  text: string;
  separator?: string;
  prefix?: string | undefined;
  suffix?: string | undefined;
  durationMS?: number;
  delayStartMS?: number;
};

export default function TypeWriter({
  text = "",
  separator = "",
  prefix = undefined,
  suffix = undefined,
  durationMS = 1000,
  delayStartMS = 0,
}: TypeWriterProps) {
  const letterIntervalMS = text.length ? durationMS / text.length : 0;
  const [remainChars, setRemainChars] = React.useState(text.split(separator));
  const [currentText, setCurrentText] = React.useState("");
  const [isInDelay, setIsInDelay] = React.useState(true);
  const handleLetter = () => {
    setIsInDelay(false);
    setRemainChars((remainChars) => {
      const char = remainChars.shift();
      if (char) {
        setCurrentText((currentText) => currentText + char);
      }
      return remainChars;
    });
  };

  React.useEffect(() => {
    let timerId = undefined;

    if (delayStartMS && currentText === "") {
      timerId = setTimeout(handleLetter, delayStartMS);
    } else {
      if (remainChars.length) {
        timerId = setTimeout(handleLetter, letterIntervalMS);
      }
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [currentText, delayStartMS, letterIntervalMS, remainChars.length]);

  return (
    <div>
      {prefix && <span>{prefix}</span>}
      <span>{currentText}</span>
      {remainChars.length > 0 && !isInDelay && (
        <span className="animate-flash-caret">_</span>
      )}
      {suffix && <span>{suffix}</span>}
    </div>
  );
}
