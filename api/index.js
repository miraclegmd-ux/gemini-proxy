export default async function handler(req, res) {
  try {
    const { route, key } = req.query;

    // Если параметров нет (вы просто открыли ссылку в браузере), не падаем, а пишем статус
    if (!route || !key) {
      return res.status(200).json({ status: "Proxy is online", message: "Waiting for API calls..." });
    }

    const targetUrl = `https://generativelanguage.googleapis.com/${route}?key=${key}`;

    const options = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (req.method !== 'GET' && req.body) {
      options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);
    const data = await response.json();
    res.status(response.status).json(data);
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
