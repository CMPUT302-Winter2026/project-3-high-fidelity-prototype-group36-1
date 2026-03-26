# Vocabulary Explorer

A modern, interactive Cree vocabulary learning application with a persistent backend and visual relationship mapping.

## 🚀 Features

- **Interactive Node Map**: Visualize word relationships through a dynamic hub.
- **Persistent Backend**: Real dictionary data served via Express and `db.json`.
- **Saved Words**: Global bookmarking system stored in local memory.
- **Advanced Linguistics**: In-depth morphological and phonetic data for learners.
- **Expert Mode**: Toggle advanced data visibility in settings.

## 🛠 Setup & Installation on a New Device

**Prerequisites:** [Node.js](https://nodejs.org/) (v18+ recommended)

1.  **Clone or Copy** the repository to your local machine.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```


## 🏃‍♂️ Running the Application

This project requires **two** server processes to be running simultaneously:

### 1. Start the Backend API
In your first terminal tab, run:
```bash
npm run server
```
*Port: 3001* - This serves the vocabulary data and handles word suggestions.

### 2. Start the Frontend Dev Server
In your second terminal tab, run:
```bash
npm run dev
```
*Port: 3000* - Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Data Structure
- **Frontend**: React (Vite), Framer Motion, Tailwind CSS v4.
- **Backend**: Node.js, Express.
- **Database**: `db.json` (Static JSON file used for persistent storage).

## 💡 Tech Stack
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS + Material Symbols
- **Animations**: Framer Motion
- **Server**: Express.js
- **Persistence**: File-based JSON Database
