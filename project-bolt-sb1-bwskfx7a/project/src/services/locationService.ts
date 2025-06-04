import axios from 'axios';
import { API_CONFIG } from '../config';
import { LocationInfo } from '../types';

export const getUserLocation = async (): Promise<LocationInfo> => {
  try {
    const response = await axios.get(API_CONFIG.LOCATION_API_URL);
    
    if (response.status === 200 && response.data) {
      return {
        country: response.data.country_name || 'Unknown',
        city: response.data.city || undefined,
        region: response.data.region || undefined,
        latitude: response.data.latitude || undefined,
        longitude: response.data.longitude || undefined,
      };
    }
    
    throw new Error('Unable to fetch location data');
  } catch (error) {
    console.error('Error fetching location:', error);
    return {
      country: 'Unknown',
    };
  }
};