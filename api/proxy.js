export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();
  const url = req.query.url;
  if (!url) return res.status(400).send("no url");
  try {
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        "User-Agent": "VLC/3.0.18 LibVLC/3.0.18",
        "Accept": "*/*",
      },
    });
    res.setHeader("Content-Type", response.headers.get("content-type") || "video/mp2t");
    res.setHeader("Cache-Control", "no-cache");
    const buffer = await response.arrayBuffer();
    res.status(200).send(Buffer.from(buffer));
  } catch (e) {
    res.status(500).send("Error: " + e.message);
  }
}
