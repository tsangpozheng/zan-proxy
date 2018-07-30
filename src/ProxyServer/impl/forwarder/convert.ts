import URL from 'url';

export default function(req) {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers['host'];
  const path = req.url;
  const url = URL.parse(`${protocol}://${host}${path}`);
  let port = url.port || 80;
  if (url.protocol && url.protocol.startsWith('https')) {
    port = 443;
  }
  return {
    auth: url.auth,
    headers: req.headers,
    host: url.host,
    hostname: url.hostname,
    method: req.method,
    path: url.path,
    port,
    protocol: url.protocol,
    rejectUnauthorized: false,
  };
}
