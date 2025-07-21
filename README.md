# recaught-native

This project contains a React Native front-end and a minimal Express backend that connects to MongoDB.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and set your `MONGODB_URI`.
3. Start the backend:
   ```bash
   npm run server
   ```
4. Start the React Native app (e.g. `npm start`).

The backend exposes the following routes:

- `GET/POST/PUT/DELETE /api/cards`
- `GET/POST /api/users`

These routes use Mongoose models located in `src/utils/models`.
