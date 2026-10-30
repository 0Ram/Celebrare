# Celebrare — Frontend Intern Pre-Screening Assignment

> **Interactive Photo Gallery Web App** built with **React**, **Vite**, and **Tailwind CSS**. Fetches 30 photos from the Picsum API, renders a responsive 4-column grid, enables real-time author filtering, and provides persistent favourites managed with `useReducer` and `localStorage`.

---

## 📋 Table of Contents
- [Assignment Overview](#-assignment-overview)
- [Requirements & Implementation Mapping](#-requirements--implementation-mapping)
- [Tech Stack](#-tech-stack)
- [Project Architecture & File Structure](#-project-architecture--file-structure)
- [Getting Started](#-getting-started)
- [Screen Recording Guide (5 Minutes)](#-screen-recording-guide-5-minutes)
  - [1. App Walkthrough Demo](#1-app-walkthrough-demo)
  - [2. useFetchPhotos Hook Explanation](#2-usefetchphotos-hook-explanation)
  - [3. useReducer Explanation](#3-usereducer-explanation)
  - [4. useCallback and useMemo Explanation](#4-usecallback-and-usememo-explanation)
  - [5. The Hardest Part & Solution](#5-the-hardest-part--solution)
- [How to Push to GitHub & Submit](#-how-to-push-to-github--submit)

---

## 🎯 Assignment Overview

| Detail | Specification |
| :--- | :--- |
| **Role** | Frontend React Internship |
| **Company** | Celebrare |
| **API** | [Picsum Photos API](https://picsum.photos/v2/list?limit=30) (limit=30) |
| **Styling** | 100% Tailwind CSS (No component libraries) |
| **State Paradigm** | `useReducer` for favourites, `useFetchPhotos` for API logic |
| **Optimization** | `useCallback` for search handler, `useMemo` for filtered list |

---

## ✅ Requirements & Implementation Mapping

All 7 core requirements from the specification are satisfied with zero external UI dependencies:

| # | Requirement | Implementation Details | Source File |
|---|---|---|---|
| **1** | **Project Setup** | Built with Vite + React 19 + Tailwind CSS. No MUI, AntD, or Bootstrap. | [`package.json`](./package.json), [`vite.config.js`](./vite.config.js) |
| **2** | **Fetch Photos from API** | Fetches 30 photos on load from `https://picsum.photos/v2/list?limit=30`. Displays animated spinner & skeleton loaders during fetch, and an error state with retry. | [`src/hooks/useFetchPhotos.js`](./src/hooks/useFetchPhotos.js), [`src/components/LoadingSpinner.jsx`](./src/components/LoadingSpinner.jsx) |
| **3** | **Responsive Grid** | Grid with **4 columns** on desktop (`lg:grid-cols-4`), **2 columns** on tablet (`md:grid-cols-2`), and **1 column** on mobile (`grid-cols-1`). Each card displays the photo, author attribution, and heart button. | [`src/components/PhotoCard.jsx`](./src/components/PhotoCard.jsx), [`src/components/Gallery.jsx`](./src/components/Gallery.jsx) |
| **4** | **Search Filter** | Real-time search input filtering photos by author name. Zero page reload and zero redundant API calls. | [`src/components/SearchBar.jsx`](./src/components/SearchBar.jsx), [`src/components/Gallery.jsx`](./src/components/Gallery.jsx) |
| **5** | **Favourites with useReducer** | Heart icon toggles favourite status. State managed via `useReducer` (not `useState`), with persistence across page refreshes via `localStorage`. | [`src/reducers/favouritesReducer.js`](./src/reducers/favouritesReducer.js), [`src/components/Gallery.jsx`](./src/components/Gallery.jsx) |
| **6** | **Custom Hook (`useFetchPhotos`)** | Encapsulates API fetch logic, returning `{ photos, loading, error, refetch }`. Clean abort controller cleanup on unmount. | [`src/hooks/useFetchPhotos.js`](./src/hooks/useFetchPhotos.js) |
| **7** | **useCallback + useMemo** | `useCallback` wraps `handleSearchChange` to prevent re-rendering memoized `SearchBar`. `useMemo` computes `filteredPhotos` to avoid unnecessary recalculations during unrelated renders. | [`src/components/Gallery.jsx`](./src/components/Gallery.jsx) |

---

## 🛠 Tech Stack

- **Core**: React 19, JavaScript (ES6+)
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS
- **Data Source**: Picsum Photos API v2
- **Linter**: Oxlint (0 errors, 0 warnings)

---

## 📂 Project Architecture & File Structure

```
Celebrare/
├── public/
├── src/
│   ├── components/
│   │   ├── ErrorState.jsx       # Error banner with retry trigger
│   │   ├── Gallery.jsx          # Master component coordinating state & hooks
│   │   ├── Header.jsx           # Clean branded header & stats badge
│   │   ├── LoadingSpinner.jsx   # Animated spinner + responsive skeletons
│   │   ├── PhotoCard.jsx        # Image card with lazy load & heart toggle
│   │   └── SearchBar.jsx        # Real-time search with clear button & count
│   ├── hooks/
│   │   └── useFetchPhotos.js    # Custom data hook returning photos, loading, error
│   ├── reducers/
│   │   └── favouritesReducer.js # Pure reducer & localStorage initializer
│   ├── utils/
│   │   └── imageUtils.js        # Formats fast, retina-optimized Picsum URLs
│   ├── App.jsx                  # Root container rendering Gallery
│   ├── index.css                # Tailwind CSS styling and dark theme base
│   └── main.jsx                 # Entry point
├── index.html                   # HTML template with SEO meta tags
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd Celebrare
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Linting Check
```bash
npm run lint    # Verifies oxlint (0 warnings, 0 errors)
npm run build   # Builds production bundle to dist/
npm run preview # Preview production build locally
```

---

## 🎥 Screen Recording Guide (5 Minutes)

Use this step-by-step script for your 5-minute video recording:

### 1. App Walkthrough Demo (~60 seconds)
1. Open the app in your browser at `http://localhost:5173`.
2. Notice the **loading spinner and skeleton loaders** that appear while data is fetched.
3. Show the **responsive grid**:
   - 4 columns on desktop
   - Resize window to tablet width (~768px) to show 2 columns
   - Resize to mobile width (<640px) to show 1 column
4. Test the **Search Bar**:
   - Type an author's name (e.g. `Alejandro` or `Paul`).
   - Point out that filtering happens instantly in real-time without any API calls or page reload.
   - Click the `x` clear button to restore the list.
5. Test **Favourites**:
   - Click the heart icon on 2 or 3 photos. Notice the vibrant filled state and counter updating.
   - **Refresh the browser (F5 / Cmd+R)**.
   - Highlight that the favourited photos and counter persist after reload!

---

### 2. `useFetchPhotos` Hook Explanation (~45 seconds)
- Open [`src/hooks/useFetchPhotos.js`](./src/hooks/useFetchPhotos.js).
- **What it returns**: It returns an object `{ photos, loading, error, refetch }`.
- **What happens if the API fails**:
  - The `try / catch` block catches network exceptions or non-200 HTTP responses (`!response.ok`).
  - It sets `error` to a descriptive error message and resets `loading` to `false`.
  - It also includes an `AbortController` to gracefully cancel pending requests if the component unmounts.
  - The `refetch` function allows the user to click "Retry Connection" in the UI without reloading the page.

---

### 3. `useReducer` Code Explanation (~45 seconds)
- Open [`src/reducers/favouritesReducer.js`](./src/reducers/favouritesReducer.js) and [`src/components/Gallery.jsx`](./src/components/Gallery.jsx).
- **Actions handled**:
  - `TOGGLE_FAVOURITE`: Checks if photo ID exists in state. If yes, filters it out; if no, appends it.
  - `SET_FAVOURITES`: Sets initial/loaded state.
  - `CLEAR_FAVOURITES`: Resets state to empty array.
- **Why useReducer over useState**:
  1. **Separation of Concerns**: The state transition logic is decoupled from the UI component in a pure, testable function.
  2. **Predictability**: Complex state transitions are centralized, avoiding scattered setter calls across components.
  3. **Scalability**: As future features are added (batch favourites, sorting, categories), adding new action types requires zero refactoring of existing logic.

---

### 4. `useCallback` and `useMemo` Explanation (~60 seconds)
- Open [`src/components/Gallery.jsx`](./src/components/Gallery.jsx).
- **`useCallback` (on `handleSearchChange`)**:
  - **Problem solved**: In React, functions defined inside a component are recreated with a new memory reference on every render. Because `SearchBar` is wrapped in `React.memo`, passing an inline or unmemoized function would break memoization and force `SearchBar` to re-render whenever *any* state in `Gallery` updates (e.g. toggling favourites). `useCallback` keeps the function reference stable.
  - **What would degrade if removed**: Every heart icon toggle on a photo card would trigger an unnecessary re-render of the search bar.
- **`useMemo` (on `filteredPhotos`)**:
  - **Problem solved**: Filtering an array of 30 items with string operations (`.trim()`, `.toLowerCase()`, `.includes()`) is an extra computational cost. `useMemo` caches the result and only recalculates when `photos`, `searchTerm`, or `favouritesSet` changes.
  - **What would degrade if removed**: Re-running `.filter()` on every single render—even during unrelated re-renders—wasting CPU cycles and degrading frame rates.

---

### 5. The Hardest Part & Solution (~45 seconds)
- **Challenge**: The Picsum Photos API returns `download_url` pointing to original raw camera images (often 5000x3333px, over 5MB each). Fetching 30 unconstrained full-res images would require downloading over **150MB of data**, leading to slow load times, high bandwidth consumption, and Cumulative Layout Shift (CLS).
- **Solution**: Implemented [`src/utils/imageUtils.js`](./src/utils/imageUtils.js) to leverage Picsum's parameterized route (`https://picsum.photos/id/${id}/600/420`). This delivers retina-crisp, web-optimized thumbnails (~40KB each), paired with an aspect-ratio container and smooth fade-in transitions.

---

## 📤 How to Push to GitHub & Submit

### 1. Initialize Git and Commit
```bash
git init -b main
git add .
git commit -m "feat: complete Celebrare photo gallery assignment with React, Vite, and Tailwind CSS"
```

### 2. Push to GitHub
1. Create a new public repository on [GitHub](https://github.com/new) named `celebrare-photo-gallery`.
2. Push your code:
```bash
git remote add origin https://github.com/<YOUR_USERNAME>/celebrare-photo-gallery.git
git branch -M main
git push -u origin main
```

### 3. Record & Submit
1. **Screen Recording**: Record a 5-minute video answering the 5 prompts above using QuickTime (Mac) or OBS Studio.
2. Upload video to **YouTube (Unlisted)** or **Google Drive (set permissions to "Anyone with the link can view")**.
3. Submit the Google Form with:
   - Your **GitHub repository link**
   - Your **Video recording link**
   - One line for the hardest part: *"Optimizing raw high-resolution Picsum images into lightweight thumbnails and synchronizing useReducer state seamlessly with localStorage persistence."*
