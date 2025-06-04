export const API_CONFIG = {
  VIRUSTOTAL_API_KEY: import.meta.env.VITE_VIRUSTOTAL_API_KEY || '',
  LOCATION_API_URL: 'https://ipapi.co/json/',
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  ALLOWED_FILE_TYPES: '*', // Allow all file types
}

export const STORAGE_KEYS = {
  FILE_POOL: 'file_pool',
  USER_UPLOADS: 'user_uploads',
  USER_DOWNLOADS: 'user_downloads',
}

export const APP_ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRIVACY: '/privacy',
  TERMS: '/terms',
}