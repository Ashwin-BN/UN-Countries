# UN Countries 🌍

Welcome to **UN Countries** – a super simple and interactive way to explore information about countries around the world! This project lets you quickly search, browse, and dive into details about any country using data from our "Countries" API.

## Features 🚀

- **Searchable Table**: Quickly find a country using a search form in the navbar.
- **Detailed Info**: Click on any country row to see a detailed modal view, including the flag, coat of arms, population, area, languages, and more.
- **Pagination**: Explore countries page-by-page for easier navigation.

## Project Setup 🛠️

- **HTML Skeleton**: We have a basic `index.html` with a responsive layout powered by Bootstrap.
- **CSS and JavaScript**: Linked from CDNs for simplicity. Includes custom styles (`main.css`) for interactivity and functionality (`main.js`).
  
### Key Elements

1. **Navbar**:
   - Search for countries by name.
   - Clear button to reset the search.
   - Customizable title (Replace with your own name to make it yours!).

2. **Country Table**:
   - 12 informative columns, like Name, Flag, Population, etc.
   - Rows that change cursor style on hover for easy selection.

3. **Pagination Control**:
   - Basic back-and-forth navigation between pages.
   - Buttons automatically adjust based on the available country data.

4. **Dynamic Modal Window**:
   - Displays details for each selected country, fully powered by JavaScript!

## How It Works ⚙️

1. **Fetch Data**: `main.js` fetches data from the "Countries" API based on your search and page number.
2. **Dynamic Rows**: Adds rows dynamically to the table, including country-specific details.
3. **Error Handling**: Displays messages if no data is found.
4. **Modal Display**: Opens up a modal window with detailed info when you click on a country row.

## Getting Started

1. Clone the project and open in VS Code.
2. Open `index.html` in a browser to start exploring!

## Tech Stack

- **HTML, CSS, JS** for the front end.
- **Bootstrap** for styling and responsiveness.
- **Countries API** for the data.

---

**Enjoy exploring the world with UN Countries! 🌎**
