import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Headers 변환: Node.js headers를 fetch-friendly headers로 변환
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      headers.append(key, Array.isArray(value) ? value.join(',') : value);
    }
  }

  try {
    const response = await fetch('http://52.79.152.88:8080/api/members', {
      method: req.method,
      headers,
      body: req.method !== 'GET' ? JSON.stringify(req.body) : null,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}
