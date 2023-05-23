import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const { PORT = 3000 } = process.env;

export const app = express();

// Parse json in requests where Content-Type header matches json
app.use(express.json());

// Serve app production bundle
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
