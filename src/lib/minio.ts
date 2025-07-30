import { Client } from 'minio';
import { Agent } from 'https';

// Extract hostname from MINIO_ENDPOINT if it includes protocol
function extractHostname(endpoint: string): string {
  if (!endpoint) return 'localhost';
  
  // If endpoint includes protocol, extract hostname
  if (endpoint.includes('://')) {
    try {
      const url = new URL(endpoint);
      return url.hostname;
    } catch (error) {
      console.error('Error parsing MinIO endpoint URL:', error);
      // Fallback: remove protocol manually
      return endpoint.replace(/^https?:\/\//, '').split(':')[0];
    }
  }
  
  // If no protocol, return as is (just hostname)
  return endpoint.split(':')[0];
}

// MinIO Client Configuration
const minioClient = new Client({
  endPoint: extractHostname(process.env.MINIO_ENDPOINT || '147.93.153.51'),
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'ragijifoundation',
  secretKey: process.env.MINIO_SECRET_KEY || 'ragijianeesh123',
  // Add this to handle SSL issues in development
  ...(process.env.NODE_ENV === 'development' && {
    // Disable SSL verification for development
    transportAgent: process.env.MINIO_USE_SSL === 'true' ? 
      new Agent({ rejectUnauthorized: false }) : undefined
  })
});

export default minioClient;
export { minioClient };

// Bucket names (matching admin panel)
export const BUCKETS = {
  IMAGES: 'ragiji-images',
  VIDEOS: 'ragiji-videos',
  DOCUMENTS: 'ragiji-documents',
} as const;

// Get authenticated object stream from MinIO
export async function getMinioObjectStream(bucketName: string, objectName: string) {
  try {
    return await minioClient.getObject(bucketName, objectName);
  } catch (error) {
    console.error('Error getting MinIO object:', error);
    throw error;
  }
}

// Check if object exists
export async function objectExists(bucketName: string, objectName: string): Promise<boolean> {
  try {
    await minioClient.statObject(bucketName, objectName);
    return true;
  } catch (error) {
    return false;
  }
}

// Get object metadata
export async function getObjectMetadata(bucketName: string, objectName: string) {
  try {
    return await minioClient.statObject(bucketName, objectName);
  } catch (error) {
    console.error('Error getting object metadata:', error);
    throw error;
  }
}
