import { addToElement, createElement } from "utils/browser";

export const Footer = () =>
  addToElement(
    createElement("footer", "Made with ❤️  by ", {
      classes: ["text-center", "text-yellow-500"],
    }),
    [
      createElement("a", "UltiRequiem", {
        classes: [
          "text-pink-500",
          "text-xl",
          "hover:underline",
          "hover:text-pink-700",
        ],
        attributes: { href: "https://ultirequiem.com" },
      }),
      addToElement(createElement("p"), [
        createElement("a", "Visit the source code", {
          classes: [
            "text-gray-500",
            "text-sm",
            "hover:underline",
            "hover:text-gray-700",
          ],
          attributes: {
            href: "https://github.com/UltiRequiem/sergif",
            target: "_blank",
          },
        }),
      ]),
    ]
  );
