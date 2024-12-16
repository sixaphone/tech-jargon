import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

type TypeWriterProps = {
  text: string;
  speed?: number;
  className?: string;
};

export const TypeWriter = ({
  text,
  className,
  speed = 50,
}: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <div className={cn("font-mono text-lg tracking-wide", className)}>
      {displayedText}
      {index < text.length && (
        <span className="inline-block w-2 h-4 ml-0.5 bg-black animate-pulse" />
      )}
    </div>
  );
};
