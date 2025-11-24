import type { 
  Reading, 
  Analysis, 
  HealthCheck, 
  ApiError, 
  SensorReading, 
  AddReadingResponse,
  DeleteReadingsResponse 
} from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

/**
 * Enhanced fetch wrapper with error handling
 */
const apiFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Handle 404 as a special case - return null for no data
      if (response.status === 404) {
        return null as T;
      }
      
      // Try to parse error message from response
      try {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      } catch (e) {
        if (e instanceof Error && e.message !== `HTTP error! status: ${response.status}`) {
          throw e;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      throw error;
    }
    
    throw new Error('Unable to connect to the server. Please check if the API is running.');
  }
};

/**
 * Health Check - Check if the API is running
 */
export const checkHealth = async (): Promise<HealthCheck> => {
  return apiFetch<HealthCheck>('/');
};

/**
 * Get All Readings - Retrieve all recorded readings within a specified time period
 * @param hours - Number of hours to look back (default: 24)
 */
export const getReadings = async (hours: number = 24): Promise<Reading[]> => {
  return apiFetch<Reading[]>(`/readings?hours=${hours}`);
};

/**
 * Get Trend Analysis - Get comprehensive statistical analysis, trends, and comfort assessment
 * @param hours - Number of hours to analyze (default: 24)
 * @returns Analysis data or null if no data available
 */
export const getAnalysis = async (hours: number = 24): Promise<Analysis | null> => {
  return apiFetch<Analysis>(`/analysis?hours=${hours}`);
};

/**
 * Add Reading - Add a new temperature and humidity reading
 * @param reading - Sensor reading data (temperature and humidity)
 */
export const addReading = async (reading: SensorReading): Promise<AddReadingResponse> => {
  return apiFetch<AddReadingResponse>('/reading', {
    method: 'POST',
    body: JSON.stringify(reading),
  });
};

/**
 * Clear All Readings - Delete all readings from the database
 */
export const clearAllReadings = async (): Promise<DeleteReadingsResponse> => {
  return apiFetch<DeleteReadingsResponse>('/readings', {
    method: 'DELETE',
  });
};

/**
 * Get Dashboard URL - Returns the URL for the interactive dashboard
 */
export const getDashboardUrl = (): string => {
  return `${API_BASE_URL}/dashboard`;
};
