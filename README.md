# Climate Monitor - Temperature & Humidity Tracking

A real-time temperature and humidity monitoring dashboard built with React, TypeScript, and Vite.

## Project info

**URL**: https://lovable.dev/projects/7497f5a1-2cac-432c-b418-2e90a531a2c5

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7497f5a1-2cac-432c-b418-2e90a531a2c5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- TanStack Query (React Query)
- Recharts
- Axios

## API Integration

This application integrates with a Temperature & Humidity API running on `http://127.0.0.1:8000`.

### Prerequisites

1. Ensure the Temperature & Humidity API server is running
2. The API should be accessible at `http://127.0.0.1:8000`

### Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### API Endpoints Used

- **GET /** - Health check
- **GET /readings?hours={hours}** - Get all readings within specified time period
- **GET /analysis?hours={hours}** - Get comprehensive analysis with trends and comfort assessment

### Features

- **Real-time Monitoring**: Display current temperature and humidity readings
- **Trend Analysis**: View historical data with interactive charts
- **Comfort Assessment**: Get comfort level indicators based on optimal ranges
- **Anomaly Detection**: Alerts for unusual temperature or humidity spikes
- **Time Period Selection**: View data for 1h, 6h, 24h, or 7 days
- **Auto-refresh**: Automatically updates every 60 seconds
- **Error Handling**: Graceful error messages when API is unavailable

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7497f5a1-2cac-432c-b418-2e90a531a2c5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
