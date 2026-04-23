# ClueForge: The Ultimate Word Puzzle Challenge

ClueForge is a premium, full-stack word puzzle game designed with a modern glassmorphic aesthetic and immersive 3D-styled animations. Challenge your vocabulary, climb the global rankings, and decode phrases across diverse categories!

---

##  Features

-  **Premium Glassmorphic UI**: A stunning visual experience with multi-layer blurs, vibrant gradients, and 3D-styled components.
-  **Spin the Wheel**: Interactive category selection with a high-fidelity animated wheel.
-  **Global Leaderboard**: Real-time rankings with an interactive podium, search functionality, and achievement sharing.
-  **AI-Powered Puzzles**: Dynamic puzzle generation using Google GenAI for unique and challenging categories.
-  **Fully Responsive**: Optimized for all devices, from high-end desktops to mobile screens.
-  **Smooth Animations**: Powered by Framer Motion for a fluid, alive interface.

---

## Tech Stack

### Frontend
- **Framework**: [React](Vite)
- **Styling**: Vanilla CSS (Custom Design System)
- **Animations**: [Framer Motion]

### Backend
- **Framework**: [Django]
- **API**: [Django REST Framework]
- **Database**: PostgreSQL (Recommended)
- **AI Integration**: Google GenAI (Gemini)


---

## 📂 Project Structure     

```text
word-puzzle-game/
├── frontend/             # React + Vite application
│   ├── src/
│   │   ├── api/          # Axios client and API services
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Main application views (Game, Leaderboard, etc.)
│   │   └── index.css     # Core design system and global styles
├── backend/              # Django backend application
│   ├── core/             # Project settings and configuration
│   ├── game/             # Main game logic and puzzle management
│   ├── leaderboard/      # Ranking system and score submission
│   ├── puzzles/          # AI-powered puzzle generation logic
│   └── seedme.py         # Database seeding script
```

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/MiliKava/clueforge-ai-word-game.git
```

### 2. Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)
- **PostgreSQL** installed and running.

---

### 3. Backend Setup

#### Create Database
Before proceeding, create a PostgreSQL database named `wordgame`:
```sql
CREATE DATABASE wordgame;
```

#### Install Dependencies
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```env
GEMINI_API_KEY=your_google_ai_key_here
DEBUG=True

# Database Configuration
DB_ENGINE=django.db.backends.postgresql
DB_NAME=wordgame
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

#### Run Migrations & Seeding
```bash
python manage.py migrate
python seedme.py  # Populates the game with initial puzzles
```

#### Start Backend Server
```bash
python manage.py runserver
```

####  Generating New Datasets (Optional)
If you want to expand the game's library using AI, you can run the generation script:
```bash
python generate_dataset.py
```
> This requires a valid `GEMINI_API_KEY` in your `.env` and will update `fallback_dataset.json` with fresh puzzles.

---

### 4. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The game should now be accessible at `http://localhost:5173`.

---

## How to Play
1. **Pick a Category**: Spin the wheel or select a category manually.
2. **Guess the Word**: Use the on-screen keyboard or your physical keyboard to guess letters.
3. **Use Hints**: Stuck? The AI-powered hint system (Gemini) can provide clues.
4. **Climb the Ranks**: Complete puzzles quickly to earn points and secure your spot on the Global Champions leaderboard!


