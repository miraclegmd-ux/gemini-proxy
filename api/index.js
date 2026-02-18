export default async function handler(req, res) {
  // Мы будем передавать нужный путь в параметре 'route'
  const { route, key } = req.query;
  
  if (!route || !key) {
    return res.status(400).json({ error: "Missing route or key parameter" });
  }

  const targetUrl = `https://generativelanguage.googleapis.com/${route}?key=${key}`;

  const response = await fetch(targetUrl, {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : null,
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
