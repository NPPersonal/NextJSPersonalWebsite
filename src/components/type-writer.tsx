"use client";
import React from "react";

export type TypeWriterProps = {
  text: string;
  separator?: string;
  prefix?: string | undefined;
  suffix?: string | undefined;
  durationMS?: number;
  delayStartMS?: number;
  immediateStart?: boolean;
};

/**
 * Display a text with type writing effect
 * @param text `string` text to display
 * @param separator `string` used to separate text into single letter
 * e.g text: "a,b,c,d"  separator: "," result: [a, b, c, d]
 * @param prefix: `string` prefix text
 * @param suffix: `string` suffix text
 * @param durationMS: `number` duration for effect to display complete text
 * @param immediateStart: `boolean` whether to display first letter in text
 * immediately without interval delay
 * @returns
 */
export default function TypeWriter({
  text = "",
  separator = "",
  prefix = undefined,
  suffix = undefined,
  durationMS = 1000,
  immediateStart = true,
}: TypeWriterProps) {
  const textLength = text.split(separator).length;
  const letterIntervalMS = text.length > 0 ? durationMS / textLength : 0;
  const [textState, setTextState] = React.useState({
    remainChars: text.split(separator),
    currentText: "",
  });

  const handleLetter = () => {
    setTextState((textState) => {
      const char = textState.remainChars.shift();
      textState.currentText = textState.currentText + (char ? char : "");
      return { ...textState };
    });
  };

  React.useEffect(() => {
    let timerId = undefined;

    if (immediateStart && textState.remainChars.length === textLength) {
      handleLetter();
    } else if (textState.remainChars.length > 0) {
      timerId = setTimeout(handleLetter, letterIntervalMS);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [textState, letterIntervalMS, textLength, immediateStart]);

  return (
    <div>
      {prefix && <span>{prefix}</span>}
      <span>{textState.currentText}</span>
      {textState.remainChars.length > 0 && (
        <span className="animate-flash-caret">_</span>
      )}
      {suffix && <span>{suffix}</span>}
    </div>
  );
}
