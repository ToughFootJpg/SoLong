import { get, set, del, entries } from 'idb-keyval';
import { FileInfo } from '../types';

const STORAGE_KEYS = {
  FILES: 'files',
  USER_UPLOADS: 'user_uploads',
  USER_DOWNLOADS: 'user_downloads',
};

export const saveFile = async (fileInfo: FileInfo): Promise<string> => {
  const id = crypto.randomUUID();
  const key = `${STORAGE_KEYS.FILES}:${id}`;
  await set(key, { ...fileInfo, id });
  return id;
};

export const getFile = async (id: string): Promise<FileInfo | null> => {
  const key = `${STORAGE_KEYS.FILES}:${id}`;
  return await get(key);
};

export const getAllFiles = async (): Promise<FileInfo[]> => {
  const allEntries = await entries();
  return allEntries
    .filter(([key]) => key.toString().startsWith(STORAGE_KEYS.FILES))
    .map(([_, value]) => value as FileInfo);
};

export const getRandomFile = async (excludeIds: string[] = []): Promise<FileInfo | null> => {
  const files = await getAllFiles();
  const availableFiles = files.filter(
    file => file.clean && !excludeIds.includes(file.id)
  );
  
  if (availableFiles.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * availableFiles.length);
  return availableFiles[randomIndex];
};

export const updateFileScanResult = async (
  fileId: string,
  isClean: boolean,
  scanId?: string
): Promise<void> => {
  const key = `${STORAGE_KEYS.FILES}:${fileId}`;
  const file = await get(key);
  if (file) {
    await set(key, {
      ...file,
      scanned: true,
      clean: isClean,
      scanId,
    });
  }
};

export const deleteFile = async (id: string): Promise<void> => {
  const key = `${STORAGE_KEYS.FILES}:${id}`;
  await del(key);
};