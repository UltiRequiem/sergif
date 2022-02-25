import { Buffer } from "buffer";

import { createHandler } from "netfun";

import { tixteClient } from "utils/server";

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
