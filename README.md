# X Trends Scraper

This project scrapes trending topics from [X (formerly Twitter)](https://x.com) with Varying IP Addresses, stores them in a MongoDB database, and displays them on a simple web page. It leverages Selenium for web scraping, ScraperAPI for proxy handling, and Express.js for serving data via an API.

## Demo Video



https://github.com/user-attachments/assets/49ca6c4f-f6c6-41ab-817b-becea44b5490



---

## Features

- Scrapes trending topics from X with Varying IP Address.
- Stores scraped trends in a MongoDB database with unique IDs and timestamps.
- Displays the trends on a web page with a simple, responsive design.
- Includes a "Refresh Trends" button to trigger real-time scraping and update the displayed trends.

---

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **Selenium** (via `selenium-webdriver`)
- **MongoDB**
- **ScraperAPI** (for proxy and IP rotation)

### Frontend
- **HTML**
- **CSS**
- **JavaScript**

---

## Setup Instructions

### Prerequisites
1. **Node.js** and **npm** installed on your system.
2. **MongoDB** running locally or on a cloud provider (e.g., MongoDB Atlas).
3. A **ScraperAPI** account with a valid API key.
4. A valid X (formerly Twitter) account.

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/x-trends-scraper.git
   cd x-trends-scraper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file for environment variables:
   ```env
   SCRAPER_API_KEY=your_scraperapi_key
   TWITTER_EMAIL=your_twitter_email
   TWITTER_USERNAME=your_twitter_username
   TWITTER_PASSWORD=your_twitter_password
   ```

4. Start your MongoDB server:
   ```bash
   mongod
   ```

5. Run the application:
   ```bash
   node index.js
   ```

6. Open the `index.html` file in your browser or serve it via a local HTTP server for better compatibility.

---

### Obtaining a ScraperAPI API Key

1. Visit the [ScraperAPI website](https://www.scraperapi.com/) and create an account.
2. Once logged in, navigate to the **Dashboard**.
3. Copy your API key displayed on the dashboard.
4. Paste the API key into the `.env` file:
   ```env
   SCRAPER_API_KEY=your_scraperapi_key
   ```

---

## Usage

1. Navigate to the backend API:
   - The backend runs on `http://localhost:7000/trends`.

2. Open the `index.html` in your browser to:
   - View the latest trends.
   - Click "Refresh Trends" to fetch and display updated trends.

---

## API Endpoints

### `GET /trends`
- **Description**: Scrapes X for trends and stores them in MongoDB. Returns all stored trends sorted by timestamp.
- **Response**:
  ```json
  [
    {
      "uniqueId": "trend_123456789",
      "trends": ["Trend1", "Trend2", "Trend3"],
      "timestamp": "2024-12-25T10:00:00.000Z",
      "ipAddress": "192.168.1.1"
    }
  ]
  ```

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
```

You can save this content as `README.md` in your repository for GitHub. Let me know if you need any further edits!
