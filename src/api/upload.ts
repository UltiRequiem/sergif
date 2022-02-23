/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { tixteClient } from "utils/server";
import { Buffer } from "buffer";

import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "text/json",
      },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({ error: "No file" }),
    };
  }

  const post = await tixteClient.uploadFile(
    new Buffer(event.body, "base64"),
    "ultirequiem.is-from.space",
    {
      filename: "data",
      extension: "png",
    }
  );

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/json",
    },
    body: JSON.stringify({ url: post.url }),
  };
};
