import { client } from "utils/server";

import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const result = await client.getSize();

  console.log(result);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/json",
    },
    body: JSON.stringify({ message: "Hello World" }),
  };
};
