// API Response Types

export interface Reading {
  temperature: number;
  humidity: number;
  timestamp: string;
}

export interface SensorReading {
  temperature: number;
  humidity: number;
}

export interface AddReadingResponse {
  status: string;
  message: string;
  data: Reading;
}

export interface DeleteReadingsResponse {
  status: string;
  message: string;
}

export interface TemperatureStats {
  average: number;
  max: number;
  min: number;
  trend: string;
}

export interface HumidityStats {
  average: number;
  max: number;
  min: number;
  trend: string;
}

export interface ComfortAssessment {
  level: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  score: number;
  temperature_comment: string;
  humidity_comment: string;
}

export interface Anomaly {
  temperature: number;
  humidity: number;
  timestamp: string;
  reason: string;
}

export interface Analysis {
  period_hours: number;
  readings_count: number;
  temperature: TemperatureStats;
  humidity: HumidityStats;
  comfort: ComfortAssessment;
  anomalies: Anomaly[];
}

export interface HealthCheck {
  message: string;
  version: string;
}

export interface ApiError {
  detail: string;
}
