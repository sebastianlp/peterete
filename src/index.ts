import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const PORT_1 = 4000;
const PORT_2 = 4001;

const app = express();
const app2 = express();

app.use('/api', createProxyMiddleware({
  target: `http://localhost:${PORT_2}`,
  changeOrigin: true,
  logLevel: 'info',
  pathRewrite: {
    '/api': '/'
  }
}));

app2.use('/', (req, res) => {
  res.header('X-Custom-Header', `I come from ${PORT_2}`);
  
  res.json({
    protocol: req.protocol,
    hostname: req.hostname,
    port: PORT_2,
    path: req.path,
  });
});

app.listen(PORT_1, () => {
  console.log(`Server 1 running on port ${PORT_1}`);
});

app2.listen(PORT_2, 'localhost', () => {
  console.log(`Server 1 running on port ${PORT_2}`);
});