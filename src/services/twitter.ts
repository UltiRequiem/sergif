export const buildTweetLink = (url: string, text?: string): string => {
  const baseUrl = "https://twitter.com/intent/tweet";
  const params = new URLSearchParams();

  if (text) {
    params.append("text", text);
  }

  params.append("url", url);

  return `${baseUrl}?${params.toString()}`;
};
