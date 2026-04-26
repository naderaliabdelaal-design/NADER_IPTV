export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
  const url = req.query.url;
  if (!url) return res.status(400).send("no url");
  try {
    const decoded = decodeURIComponent(url);
    const response = await fetch(decoded, {
      headers: {
        "User-Agent": "VLC/3.0.18 LibVLC/3.0.18",
        "Accept": "*/*",
      },
    });
    const buffer = await response.arrayBuffer();
    const text = Buffer.from(buffer).toString("utf-8");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send(text);
  } catch (e) {
    res.status(500).send("Error: " + e.message);
  }
}
