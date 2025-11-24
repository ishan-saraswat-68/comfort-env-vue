# API Integration Guide

This document explains how the Climate Monitor application integrates with the Temperature & Humidity API.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Setup](#setup)
- [Usage](#usage)
- [API Service](#api-service)
- [Custom Hooks](#custom-hooks)
- [Error Handling](#error-handling)
- [Testing](#testing)

## Overview

The application uses Axios for HTTP requests and TanStack Query (React Query) for data fetching, caching, and synchronization.

## Architecture

```
src/
├── services/
│   └── api.ts              # API client and endpoint functions
├── types/
│   └── api.ts              # TypeScript interfaces for API responses
├── hooks/
│   └── useClimateData.ts   # Custom hooks for data fetching
└── pages/
    └── Index.tsx           # Main dashboard component
```

## Setup

### 1. Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 2. Install Dependencies

The following dependencies are required:

- `axios`: HTTP client
- `@tanstack/react-query`: Data fetching and caching

They should already be installed. If not:

```bash
npm install axios @tanstack/react-query
```

### 3. Start the API Server

Ensure the Temperature & Humidity API is running on `http://127.0.0.1:8000`

## Usage

### Using the API Service Directly

```typescript
import { getReadings, getAnalysis, checkHealth } from '@/services/api';

// Fetch readings for the last 24 hours
const readings = await getReadings(24);

// Fetch analysis for the last 6 hours
const analysis = await getAnalysis(6);

// Check API health
const health = await checkHealth();
```

### Using Custom Hooks (Recommended)

```typescript
import { useClimateData } from '@/hooks/useClimateData';

function MyComponent() {
  const { readings, analysis, isLoading, isError, error, refetch } = useClimateData({
    hours: 24,
    autoRefresh: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Latest Temperature: {readings[readings.length - 1].temperature}°C</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

## API Service

### `api.ts`

Located at `src/services/api.ts`, this file contains:

#### Configuration

- Base URL from environment variable
- 10-second timeout
- Automatic error handling

#### Functions

##### `checkHealth()`
Check if the API is running.

```typescript
const health = await checkHealth();
// Returns: { message: string, version: string }
```

##### `getReadings(hours)`
Fetch all readings within a time period.

```typescript
const readings = await getReadings(24);
// Returns: Array<{ temperature: number, humidity: number, timestamp: string }>
```

##### `getAnalysis(hours)`
Get comprehensive analysis including trends and comfort assessment.

```typescript
const analysis = await getAnalysis(24);
// Returns: Analysis object with temperature, humidity, comfort, and anomalies
```

## Custom Hooks

### `useClimateData`

The primary hook for fetching climate data.

```typescript
const {
  readings,      // Reading[] | undefined
  analysis,      // Analysis | undefined
  isLoading,     // boolean
  isError,       // boolean
  error,         // Error | null
  refetch,       // () => Promise<void>
} = useClimateData({
  hours: 24,           // Time period (default: 24)
  autoRefresh: true,   // Enable auto-refresh (default: true)
  refreshInterval: 60000, // Refresh interval in ms (default: 60000)
});
```

### `useReadings`

Fetch only readings data.

```typescript
const { data, isLoading, isError, error, refetch } = useReadings({
  hours: 24,
  autoRefresh: true,
});
```

### `useAnalysis`

Fetch only analysis data.

```typescript
const { data, isLoading, isError, error, refetch } = useAnalysis({
  hours: 24,
  autoRefresh: true,
});
```

### `useHealthCheck`

Check API health status (automatically checks every 5 minutes).

```typescript
const { data, isLoading, isError } = useHealthCheck();
```

## Error Handling

### API Service Level

The Axios interceptor handles errors automatically:

- **Server errors** (4xx, 5xx): Extracts `detail` from response
- **Network errors**: Returns connection error message
- **Timeout errors**: Returns timeout error message

### Component Level

```typescript
const { isError, error } = useClimateData({ hours: 24 });

if (isError) {
  return (
    <div className="error-message">
      <h3>Connection Error</h3>
      <p>{error.message}</p>
    </div>
  );
}
```

### Common Error Messages

- `"Unable to connect to the server. Please check if the API is running."`
  - API server is not running or not accessible
  
- `"No readings found"`
  - No data available for the requested time period
  
- `"No recent readings found"`
  - No data in the database

## Testing

### Manual Testing

1. **Test without API**
   - Stop the API server
   - Application should show connection error
   
2. **Test with API**
   - Start API server
   - Application should fetch and display data
   
3. **Test different time periods**
   - Select 1h, 6h, 24h, 7d
   - Verify correct data is fetched

4. **Test auto-refresh**
   - Wait 60 seconds
   - Verify data updates automatically

### Test API Health

```typescript
import { checkHealth } from '@/services/api';

try {
  const health = await checkHealth();
  console.log('API Status:', health);
} catch (error) {
  console.error('API is down:', error.message);
}
```

## TypeScript Types

All API response types are defined in `src/types/api.ts`:

- `Reading`: Individual temperature/humidity reading
- `TemperatureStats`: Temperature statistics
- `HumidityStats`: Humidity statistics
- `ComfortAssessment`: Comfort level assessment
- `Anomaly`: Detected anomaly
- `Analysis`: Complete analysis response
- `HealthCheck`: API health response
- `ApiError`: Error response

## Best Practices

1. **Always use custom hooks** instead of calling API functions directly in components
2. **Handle loading and error states** in UI
3. **Use TypeScript types** for type safety
4. **Configure refresh intervals** appropriately (default 60s is good for most cases)
5. **Test API connectivity** before deploying
6. **Use environment variables** for API URL configuration

## Troubleshooting

### Data not loading

1. Check if API server is running: `curl http://127.0.0.1:8000/`
2. Check browser console for errors
3. Verify `.env` file exists and has correct `VITE_API_BASE_URL`
4. Restart dev server after changing `.env`

### Auto-refresh not working

1. Verify `autoRefresh` is set to `true`
2. Check if component is unmounted/remounted frequently
3. Check browser console for errors

### Stale data

1. React Query caches data for 30 seconds by default
2. Use the refresh button to force update
3. Adjust `staleTime` in custom hooks if needed

## Further Reading

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [Temperature & Humidity API Documentation](../API_DOCUMENTATION.md)
