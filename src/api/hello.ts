import type { Handler } from "@netlify/functions";

// eslint-disable-next-line @typescript-eslint/require-await
export const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};
