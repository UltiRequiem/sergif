import { Buffer } from "buffer";

import { createHandler } from "netfun";
import { TixteClient } from "@ultirequiem/tixte";

export const tixteClient = new TixteClient(process.env.TIXTE_API_KEY2!, {
  defaultURL: "ultirequiem.is-from.space",
});

import type { Handler } from "netfun";

export const upload: Handler = async (event) => {
  const {
    data: { url, direct_url },
  } = await tixteClient.uploadFile(Buffer.from(event.body!, "base64"), {
    extension: "gif",
  });

  return { url, direct_url };
};

export const handler = createHandler("POST", upload, { bodyRequired: true });
