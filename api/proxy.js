export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();

  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "no url" });

  try {
    const response = await fetch(decodeURIComponent(url), {
      headers: {
        "User-Agent": "Mozilla/5.0 (SmartTV) AppleWebKit/537.36",
        "Accept": "application/json, text/plain, */*",
      },
    });

    const text = await response.text();

    if (text.trim().startsWith("<")) {
      return res.status(502).json({ 
        error: "Portal URL غلط أو البيانات غلط"
      });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
