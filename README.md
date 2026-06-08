```
# LinkedOut 🎭

> An AI that turns your embarrassingly normal daily activities into peak LinkedIn content.

Saw someone post about making tea like they cured cancer. Built this. No regrets.

## What it does

You type something like `"I ate biscuits for breakfast."`  
It generates a 200-word LinkedIn post about discipline, strategic nutrition, and lessons learned.

## Tech Stack

- **React** — frontend (Cursor IDE wrote most of it)
- **Express.js** — REST API
- **Google Gemini 2.5 Flash** — the AI doing the actual work
- **PostgreSQL** — stores every caption ever generated

## API Endpoints

`POST /generate` — send a prompt, get a LinkedIn caption back

`GET /history` — returns all previously generated captions

## Getting Started

```bash
# clone the repo
git clone https://github.com/yourusername/linkedout.git

# install dependencies
npm install

# set up your .env
cp .env.example .env
```

Add these to your `.env`:

```
GEMINI_API_KEY=your_key_here
dbpass=your_db_password
dbport=5432
port=3000
```

Then create a `captions` table in PostgreSQL:

```sql
CREATE TABLE captions (
  id SERIAL PRIMARY KEY,
  given_prompt TEXT,
  caption TEXT
);
```

Run the server:

```bash
node index.js
```

## Status

Work in progress. Cursor IDE is the real founder. I just watched.
```
