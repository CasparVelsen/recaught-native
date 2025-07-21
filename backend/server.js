import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import dbConnect from '../src/utils/lib/dbConnect.js';
import cardsHandler from '../src/utils/api/cards/index.js';
import usersHandler from '../src/utils/api/users/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.all('/api/cards', (req, res) => cardsHandler(req, res));
app.all('/api/users', (req, res) => usersHandler(req, res));

// connect to database then start server
(async () => {
  try {
    await dbConnect();
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Database connection failed', err);
    process.exit(1);
  }
})();
