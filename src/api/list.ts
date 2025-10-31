import { createHandler } from "netfun";
import type { Handler } from "netfun";
import { TixteClient } from "@ultirequiem/tixte";

// Should move to tixte package
interface Upload {
	domain: string;
	name: string;
	extension: string;
}

interface UploadResponse {
	uploads: Upload[];
}

if (!process.env.TIXTE_API_KEY2) {
	throw new Error("Missing TIXTE_API_KEY2 environment variable");
}

export const tixteClient = new TixteClient(process.env.TIXTE_API_KEY2, {
	defaultURL: "ultirequiem.is-from.space",
});

const list: Handler = async (event) => {
	if (!event.body) {
		return { error: "Missing body", statusCode: 400 };
	}
	const { page, amount } = JSON.parse(event.body) as Record<
		string,
		number | undefined
	>;

	if (!page) {
		return { error: "Missing page", statusCode: 400 };
	}

	const response = await tixteClient.uploads(page, amount ?? 3);

	const data = (response as { data?: UploadResponse }).data;

	if (!data?.uploads || data.uploads.length === 0) {
		return { error: "No uploads found", statusCode: 404 };
	}

	const urls = data.uploads.map(
		({ domain, name, extension }) => `https://${domain}/r/${name}.${extension}`,
	);

	return urls;
};

export const handler = createHandler("POST", list, { bodyRequired: true });
