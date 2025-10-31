import { Buffer } from "node:buffer";
import { TixteClient } from "@ultirequiem/tixte";
import { createHandler } from "netfun";

if (!process.env.TIXTE_API_KEY2) {
  throw new Error("Missing TIXTE_API_KEY2 environment variable");
}

export const tixteClient = new TixteClient(process.env.TIXTE_API_KEY2, {
  defaultURL: "ultirequiem.is-from.space",
});

import type { Handler } from "netfun";

export const upload: Handler = async (event) => {
  if (!event.body) {
    return { error: "Missing body", statusCode: 400 };
  }

  const {
    data: { url, direct_url },
  } = await tixteClient.uploadFile(Buffer.from(event.body, "base64"), {
    extension: "gif",
  });

  return { url, direct_url };
};

export const handler = createHandler("POST", upload, { bodyRequired: true });
