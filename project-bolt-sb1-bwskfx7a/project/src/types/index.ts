export interface FileInfo {
  id: string;
  name: string;
  type: string;
  size: number;
  location?: LocationInfo;
  uploadedAt: string;
  scanned: boolean;
  clean: boolean;
  url?: string;
}

export interface LocationInfo {
  country: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

export interface ScanResult {
  isClean: boolean;
  detections?: number;
  totalScans?: number;
  scanId?: string;
}

export interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export interface DownloadState {
  isDownloading: boolean;
  progress: number;
  error: string | null;
  file: FileInfo | null;
}