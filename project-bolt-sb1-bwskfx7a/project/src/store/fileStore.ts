import { create } from 'zustand';
import { FileInfo, UploadState, DownloadState } from '../types';
import { saveFile, getRandomFile, updateFileScanResult } from '../services/storage';
import { getUserLocation } from '../services/locationService';
import virusTotalService from '../services/virusTotalService';

interface FileStore {
  uploadState: UploadState;
  downloadState: DownloadState;
  uploadedFiles: FileInfo[];
  downloadedFiles: FileInfo[];
  
  uploadFile: (file: File) => Promise<void>;
  downloadRandomFile: () => Promise<void>;
  resetUploadState: () => void;
  resetDownloadState: () => void;
}

export const useFileStore = create<FileStore>((set, get) => ({
  uploadState: {
    isUploading: false,
    progress: 0,
    error: null,
  },
  downloadState: {
    isDownloading: false,
    progress: 0,
    error: null,
    file: null,
  },
  uploadedFiles: [],
  downloadedFiles: [],
  
  uploadFile: async (file: File) => {
    try {
      set({
        uploadState: {
          isUploading: true,
          progress: 0,
          error: null,
        },
      });
      
      set(state => ({
        uploadState: {
          ...state.uploadState,
          progress: 10,
        },
      }));
      
      const location = await getUserLocation();
      
      set(state => ({
        uploadState: {
          ...state.uploadState,
          progress: 30,
        },
      }));
      
      // Create object URL for the file
      const url = URL.createObjectURL(file);
      
      set(state => ({
        uploadState: {
          ...state.uploadState,
          progress: 50,
        },
      }));
      
      const scanResult = await virusTotalService.scanFile(file);
      
      set(state => ({
        uploadState: {
          ...state.uploadState,
          progress: 70,
        },
      }));
      
      const fileInfo: FileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
        location: location,
        uploadedAt: new Date().toISOString(),
        scanned: true,
        clean: scanResult.isClean,
        url,
      };
      
      const fileId = await saveFile(fileInfo);
      
      await updateFileScanResult(fileId, scanResult.isClean, scanResult.scanId);
      
      set(state => ({
        uploadState: {
          ...state.uploadState,
          progress: 90,
        },
      }));
      
      const newFileInfo: FileInfo = {
        ...fileInfo,
        id: fileId,
      };
      
      set(state => ({
        uploadedFiles: [...state.uploadedFiles, newFileInfo],
        uploadState: {
          isUploading: false,
          progress: 100,
          error: null,
        },
      }));
      
      setTimeout(() => {
        set(state => ({
          uploadState: {
            ...state.uploadState,
            progress: 0,
          },
        }));
      }, 1000);
      
    } catch (error) {
      set(state => ({
        uploadState: {
          isUploading: false,
          progress: 0,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        },
      }));
    }
  },
  
  downloadRandomFile: async () => {
    try {
      set({
        downloadState: {
          isDownloading: true,
          progress: 0,
          error: null,
          file: null,
        },
      });
      
      const downloadedIds = get().downloadedFiles.map(file => file.id);
      
      set(state => ({
        downloadState: {
          ...state.downloadState,
          progress: 30,
        },
      }));
      
      const fileData = await getRandomFile(downloadedIds);
      
      if (!fileData) {
        throw new Error('No files available in the pool');
      }
      
      set(state => ({
        downloadState: {
          ...state.downloadState,
          progress: 90,
        },
      }));
      
      set(state => ({
        downloadedFiles: [...state.downloadedFiles, fileData],
        downloadState: {
          isDownloading: false,
          progress: 100,
          file: fileData,
          error: null,
        },
      }));
      
    } catch (error) {
      set(state => ({
        downloadState: {
          isDownloading: false,
          progress: 0,
          file: null,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        },
      }));
    }
  },
  
  resetUploadState: () => {
    set({
      uploadState: {
        isUploading: false,
        progress: 0,
        error: null,
      },
    });
  },
  
  resetDownloadState: () => {
    set({
      downloadState: {
        isDownloading: false,
        progress: 0,
        error: null,
        file: null,
      },
    });
  },
}));