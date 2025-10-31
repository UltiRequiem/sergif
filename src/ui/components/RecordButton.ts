import { createElement, type EleOptions } from "kumeru";

const recordButtonClasses = [
  "bg-blue-500",
  "mx-3",
  "my-3",
  "hover:bg-blue-700",
  "text-white",
  "font-bold",
  "py-3",
  "px-12",
  "rounded",
];

export const RecordButtons = (
  text: string,
  optionals: EleOptions<HTMLButtonElement> = {}
) =>
  createElement("button", text, {
    classes: recordButtonClasses,
    ...optionals,
  });
