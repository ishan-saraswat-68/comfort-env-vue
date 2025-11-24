# Climate Monitor - Temperature & Humidity Dashboard

A real-time environmental monitoring dashboard built with **React**, **TypeScript**, and **Vite**. This application visualizes temperature and humidity data, provides comfort assessments, and tracks historical trends.

## 🚀 Technologies Used

-   **Frontend Framework**: React 18
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS, shadcn/ui
-   **State Management / Data Fetching**: TanStack Query (React Query)
-   **Charts**: Recharts
-   **Icons**: Lucide React
-   **HTTP Client**: Axios (or native fetch wrapper)

## 📂 Project Structure

The source code is located in the `src` directory. Here's a high-level overview:

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui base components
│   └── ...            # Feature-specific components (TrendChart, ComfortIndicator, etc.)
├── hooks/             # Custom React hooks (useClimateData, etc.)
├── pages/             # Route components (Index.tsx)
├── services/          # API communication logic
├── types/             # TypeScript type definitions
└── lib/               # Utility functions
```

## 🌡️ Temperature & Humidity Logic ("Temperature Files")

This section details how the application handles environmental data, often referred to as the "temperature files" logic.

### 1. Data Types (`src/types/api.ts`)
The application defines strict TypeScript interfaces for API responses:
-   **`Reading`**: Represents a single data point with `temperature`, `humidity`, and `timestamp`.
-   **`Analysis`**: A comprehensive object containing statistical stats (min, max, average) for both temperature and humidity, along with a `ComfortAssessment`.
-   **`ComfortAssessment`**: Contains a calculated `score` (0-100), a descriptive `level` (e.g., "Good", "Poor"), and specific comments for temperature and humidity.

### 2. Data Fetching (`src/services/api.ts`)
All communication with the backend happens here. Key functions include:
-   **`getReadings(hours)`**: Fetches raw data points for the specified time period.
-   **`getAnalysis(hours)`**: Retrieves aggregated stats and comfort analysis.
-   **`addReading(reading)`**: Posts new sensor data to the backend.

### 3. Visualization Components (`src/components/`)
-   **`ComfortIndicator.tsx`**: Visualizes the `ComfortAssessment`. It uses a color-coded gauge (calculated based on the `score`) and displays the comfort level (e.g., "Excellent") along with specific feedback (e.g., "Temperature is slightly high").
-   **`TrendChart.tsx`**: Uses `Recharts` to render a line graph of temperature and humidity over time. It processes the raw `Reading[]` data to format timestamps for the X-axis.
-   **`HeroStats.tsx`**: Displays the most recent temperature and humidity readings prominently.
-   **`AnomalyAlert.tsx`**: Shows warnings if the backend detects unusual data patterns (defined in the `Analysis` type).

## 🔌 API Integration

The frontend expects a backend server running at `http://127.0.0.1:8000` (default).

### Environment Variables
Create a `.env` file in the root directory to configure the API URL:
```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### Key Endpoints
-   `GET /`: Health check.
-   `GET /readings?hours={n}`: Retrieve historical data.
-   `GET /analysis?hours={n}`: Retrieve statistical analysis and comfort score.
-   `POST /reading`: Submit a new reading.

## 🛠️ Setup & Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## 📝 Editing

This project is configured for use with **Lovable**, but can be edited with any standard IDE (VS Code, WebStorm, etc.).
-   **VS Code**: Recommended extensions include ESLint, Prettier, and Tailwind CSS IntelliSense.
