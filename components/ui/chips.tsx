import * as React from "react";

import { cn } from "@/lib/utils";

type ChipsProps = {
  className?: string;
  items: readonly string[];
  chipClassName?: string;
  value?: string;
  onChange: (value: string) => void;
};

const Chips = ({ className, chipClassName, items, onChange, value }: ChipsProps) => {
  return (
    <div className={cn("flex flex-wrap justify-between gap-4", className)}>
      {items.map((item, index) => (
        <button
          type='button'
          key={index}
          onClick={() => onChange(item)}
          className={cn(
            "flex flex-grow items-center justify-center p-4 capitalize text-xs font-semibold text-black z-10 border bg-white rounded-sm transition-all duration-300",
            value === item ? "bg-primary text-white" : "",
            chipClassName
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

Chips.displayName = "Chips";

export { Chips };
