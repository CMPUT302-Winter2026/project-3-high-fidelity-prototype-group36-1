import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../db.json');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Helper to read DB
async function readDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading db.json:', error);
    return { vocabulary: [], suggestions: [] };
  }
}

// Helper to write DB
async function writeDB(data: any) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing db.json:', error);
  }
}

// Endpoint: Get all vocabulary
app.get('/api/vocabulary', async (req, res) => {
  const db = await readDB();
  res.json(db.vocabulary || []);
});

// Endpoint: Get vocabulary by category
app.get('/api/vocabulary/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const db = await readDB();
  const categoryWords = db.vocabulary.filter(
    (w: any) => w.category.toLowerCase() === categoryId.toLowerCase()
  );
  res.json(categoryWords);
});

// Endpoint: Submit a new word suggestion
app.post('/api/vocabulary/suggest', async (req, res) => {
  const { word, description, category } = req.body;
  if (!word || !description) {
    return res.status(400).json({ error: 'Word and description are required.' });
  }

  const db = await readDB();
  const newSuggestion = {
    id: Date.now().toString(),
    word,
    description,
    category: category || 'general',
    status: 'pending',
    submittedAt: new Date().toISOString()
  };

  db.suggestions = db.suggestions || [];
  db.suggestions.push(newSuggestion);
  
  await writeDB(db);
  res.status(201).json({ message: 'Suggestion saved successfully', suggestion: newSuggestion });
});

app.listen(PORT, () => {
  console.log(`Backend Server API running on http://localhost:${PORT}`);
});
