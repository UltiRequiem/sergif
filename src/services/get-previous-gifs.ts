const defaultGIFS = [
  "https://ultirequiem.is-from.space/r/kzzxiect30a.gif",
  "https://ultirequiem.is-from.space/r/l003gbbrc0a.gif",
  "https://ultirequiem.is-from.space/r/l00etl8t60a.gif",
];

export async function getPreviousGIFS(page = 1) {
  const response = await fetch("/.netlify/functions/list", {
    method: "POST",
    body: JSON.stringify({
      page,
    }),
  });

  const data = response.ok
    ? ((await response.json()) as string[])
    : defaultGIFS;

  return data;
}
