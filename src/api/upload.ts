import { tixteClient, Handler, createHandler } from "utils/server";
import { Buffer } from "buffer";

export const upload: Handler = async (event) => {
  const {
    data: { url, direct_url },
  } = await tixteClient.uploadFile(Buffer.from(event.body!, "base64"), {
    extension: "gif",
  });

  return { url, direct_url };
};

export const handler = createHandler("POST", upload, { bodyRequired: true });
