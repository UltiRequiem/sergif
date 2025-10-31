const baseUrl = "https://twitter.com/intent/tweet" as const;

export const buildTweetLink = (url: string, text?: string): string => {
  const params = new URLSearchParams();

  if (text) {
    params.append("text", text);
  }

  params.append("url", url);

  return `${baseUrl}?${params.toString()}`;
};
