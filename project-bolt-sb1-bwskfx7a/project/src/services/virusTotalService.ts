import axios from 'axios';
import { API_CONFIG } from '../config';
import { ScanResult } from '../types';

// Create an edge function to avoid exposing API key in client
const scanFile = async (file: File): Promise<ScanResult> => {
  try {
    // Here we'd normally call our edge function that would handle the scanning
    // For demo purposes, we'll mock a successful scan
    // In production, this would call the Supabase edge function:
    
    /*
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post('/api/scan-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
    */
    
    // Mock response for development
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
    
    return {
      isClean: true,
      detections: 0,
      totalScans: 68,
      scanId: 'mock-scan-id-' + Date.now(),
    };
  } catch (error) {
    console.error('Error scanning file:', error);
    throw new Error('Failed to scan file');
  }
};

export default {
  scanFile,
};