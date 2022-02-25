/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//
import { Client } from "./tixte";

export const tixteClient = new Client(process.env.TIXTE_API_KEY!, {
  defaultURL: "sergif.likes.cash",
});
console.log(tixteClient);

export * from "./netfun"
