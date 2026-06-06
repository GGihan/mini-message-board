import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import indexRouter from './routes/indexRouter.js';

const app = express();
// Declaring __dirname because we are using modules instead of commonjs
// Also joining the full path together with the directionary name
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewsDirectory = path.join(__dirname, 'views');
const assetsPath = path.join(__dirname, 'public');

// Setting paths and engine for template and static files
app.set('views', viewsDirectory);
app.set('view engine', 'ejs');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

// All none existing paths here
app.get('*path', (req, res) => {
  res.status(404).sendFile(path.resolve('public', 'html', '404.html'));
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is running at http://localhost:${PORT}/`);
});