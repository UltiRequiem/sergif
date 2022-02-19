import { addToElement, createElement } from "./utils";

export const RecordButtons = (
  text: string,
  disabled = false,
) => createElement("button", text, {
  classes: [
    "bg-blue-500",
    "max-w-2xl",
    "my-3",
    "hover:bg-blue-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded",
  ],
  attributes: {
    disabled,
  },
});

export const DownloadButton = () => addToElement(
  createElement("button",
    { classes: "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" }),
  addToElement(createElement("svg", { classes: "fill-current w-4 h-4 mr-2", attributes: { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" } }), createElement("path", { attributes: { d: "M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" } })),
  createElement("span", "Download")
)


export const Title = (text: string) => createElement("h1", text, {
  classes: "underline hover:underline decoration-pink-500 text-7xl my-7",
});

