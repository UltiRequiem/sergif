/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { createHandler } from "netfun";
import type { Handler } from "netfun";

import { tixteClient } from "utils/server";

const list: Handler = async (event) => {
  const { page, amount } = JSON.parse(event.body!) as Record<
    string,
    number | undefined
  >;

  if (!page) {
    return { error: "Missing page", statusCode: 400 };
  }

  const { data } = await tixteClient.uploads(page, amount ?? 3);

  const urls = data.uploads!.map(
    ({ domain, name, extension }: Record<string, string>) =>
      `https://${domain}/r/${name}.${extension}`
  ) as string[];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return urls;
};

export const handler = createHandler("POST", list, { bodyRequired: true });
