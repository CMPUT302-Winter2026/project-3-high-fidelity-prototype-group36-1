# Vocabulary Explorer

A modern, interactive Cree vocabulary learning application with visual relationship mapping.

## 🚀 Features

- **Interactive Node Map**: Visualize word relationships through a dynamic hub.
- **Bundled Data**: All vocabulary data is bundled directly into the frontend.
- **Saved Words**: Global bookmarking system stored in localStorage.
- **Advanced Linguistics**: In-depth morphological and phonetic data for learners.
- **Expert Mode**: Toggle advanced data visibility in settings.
- **Dark Mode**: Toggle between light and dark themes.
- **Diacritics-Insensitive Search**: Search Cree words without needing special characters.
- **Onboarding Tutorial**: Splash screen for new users with replay option in settings.

## 🛠 Setup & Installation on a New Device

**Prerequisites:** [Node.js](https://nodejs.org/) (v18+ recommended)

1.  **Clone or Copy** the repository to your local machine.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```

## 🏃‍♂️ Running the Application

Start the development server:

```bash
npm run dev
```

_Port: 3000_ - Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deploying to GitHub Pages

```bash
npm run deploy
```

This builds the app and publishes it to the `gh-pages` branch.

## 📁 Data Structure

- **Frontend**: React (Vite), Motion, Tailwind CSS v4.
- **Data**: `db.json` (Bundled JSON vocabulary database).

## 💡 Tech Stack

- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS + Material Symbols
- **Animations**: Motion (motion/react)
- **Build Tool**: Vite
- **Hosting**: GitHub Pages
