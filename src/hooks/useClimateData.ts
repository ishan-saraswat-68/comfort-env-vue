import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { getReadings, getAnalysis, checkHealth, addReading, clearAllReadings } from '@/services/api';
import type { 
  Reading, 
  Analysis, 
  HealthCheck, 
  SensorReading, 
  AddReadingResponse,
  DeleteReadingsResponse 
} from '@/types/api';

interface UseReadingsOptions {
  hours?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

/**
 * Hook to fetch temperature and humidity readings
 */
export const useReadings = (options: UseReadingsOptions = {}): UseQueryResult<Reading[]> => {
  const { 
    hours = 24, 
    autoRefresh = true, 
    refreshInterval = 60000 
  } = options;

  return useQuery<Reading[]>({
    queryKey: ['readings', hours],
    queryFn: () => getReadings(hours),
    refetchInterval: autoRefresh ? refreshInterval : false,
    retry: 2,
    staleTime: 30000, // Consider data stale after 30 seconds
  });
};

/**
 * Hook to fetch analysis data including trends and comfort assessment
 */
export const useAnalysis = (options: UseReadingsOptions = {}): UseQueryResult<Analysis | null> => {
  const { 
    hours = 24, 
    autoRefresh = true, 
    refreshInterval = 60000 
  } = options;

  return useQuery<Analysis | null>({
    queryKey: ['analysis', hours],
    queryFn: () => getAnalysis(hours),
    refetchInterval: autoRefresh ? refreshInterval : false,
    retry: 2,
    staleTime: 30000,
  });
};

/**
 * Hook to check API health status
 */
export const useHealthCheck = (): UseQueryResult<HealthCheck> => {
  return useQuery<HealthCheck>({
    queryKey: ['health'],
    queryFn: checkHealth,
    refetchInterval: 300000, // Check every 5 minutes
    retry: 3,
  });
};

/**
 * Hook to add a new reading
 */
export const useAddReading = (): UseMutationResult<AddReadingResponse, Error, SensorReading> => {
  return useMutation<AddReadingResponse, Error, SensorReading>({
    mutationFn: (reading: SensorReading) => addReading(reading),
  });
};

/**
 * Hook to clear all readings
 */
export const useClearReadings = (): UseMutationResult<DeleteReadingsResponse, Error, void> => {
  return useMutation<DeleteReadingsResponse, Error, void>({
    mutationFn: () => clearAllReadings(),
  });
};

/**
 * Combined hook to fetch both readings and analysis
 */
export const useClimateData = (options: UseReadingsOptions = {}) => {
  const readings = useReadings(options);
  const analysis = useAnalysis(options);

  return {
    readings: readings.data,
    analysis: analysis.data,
    isLoading: readings.isLoading || analysis.isLoading,
    isError: readings.isError || analysis.isError,
    error: readings.error || analysis.error,
    refetch: async () => {
      await Promise.all([readings.refetch(), analysis.refetch()]);
    },
  };
};
