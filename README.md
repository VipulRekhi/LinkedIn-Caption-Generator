# LinkedOut 🎭

> An AI that turns your embarrassingly normal daily activities into peak LinkedIn content.

Saw someone post about making tea like they cured cancer. Built this. No regrets.

---

## 🚀 What it does

You type something like:

```text
I ate biscuits for breakfast.
```

LinkedOut generates a 200-word LinkedIn post packed with:

* Leadership lessons
* Personal growth insights
* Strategic thinking
* Productivity wisdom
* Unnecessary corporate jargon

Because apparently every life event is a learning opportunity.

---

## 🛠️ Tech Stack

| Technology              | Purpose                 |
| ----------------------- | ----------------------- |
| React                   | Frontend UI             |
| Express.js              | Backend REST API        |
| Google Gemini 2.5 Flash | AI caption generation   |
| PostgreSQL              | Caption history storage |

---

## 📡 API Endpoints

### Generate Caption

```http
POST /generate
```

Generates a LinkedIn-style post from a user prompt.

### Get History

```http
GET /history
```

Returns all previously generated captions.

---

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/linkedout.git
cd linkedout
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
GEMINI_API_KEY=your_key_here
dbpass=your_db_password
dbport=5432
port=3000
```

### 4. Create PostgreSQL Database

Create the table:

```sql
CREATE TABLE captions (
    id SERIAL PRIMARY KEY,
    given_prompt TEXT,
    caption TEXT
);
```

### 5. Start the Server

```bash
node index.js
```

---

## 💡 Example

**Input**

```text
I ate biscuits for breakfast.
```

**Output**

```text
This morning, while enjoying a simple breakfast of biscuits,
I was reminded that success often comes from consistency rather
than complexity...

[180 more words of unnecessary professional wisdom]
```

---

## 📂 Project Structure

```text
linkedout/
│
├── client/
│   ├── src/
│   └── public/
│
├── server/
│   ├── index.js
│   └── routes/
│
├── .env
├── package.json
└── README.md
```

---

## ⚠️ Disclaimer

LinkedOut is a parody project.

Any resemblance to actual LinkedIn posts is purely coincidental, although statistically unlikely.

---
