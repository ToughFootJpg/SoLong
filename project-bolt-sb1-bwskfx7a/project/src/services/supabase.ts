import { createClient } from '@supabase/supabase-js';
import { API_CONFIG } from '../config';

const supabaseUrl = API_CONFIG.SUPABASE_URL;
const supabaseKey = API_CONFIG.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadFile = async (file: File, path: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('files')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data.path;
};

export const getFileUrl = async (path: string): Promise<string> => {
  const { data } = await supabase.storage.from('files').getPublicUrl(path);
  return data.publicUrl;
};

export const addFileRecord = async (fileInfo: any): Promise<string> => {
  const { data, error } = await supabase.from('files').insert(fileInfo).select('id').single();

  if (error) {
    throw new Error(error.message);
  }

  return data.id;
};

export const getRandomFile = async (excludeIds: string[] = []): Promise<any> => {
  // First, get count of all files
  const { count, error: countError } = await supabase
    .from('files')
    .select('*', { count: 'exact', head: true })
    .eq('clean', true);

  if (countError) {
    throw new Error(countError.message);
  }

  if (!count || count === 0) {
    throw new Error('No files available in the pool');
  }

  // Get random offset
  const randomOffset = Math.floor(Math.random() * count);

  // Fetch a random file
  let query = supabase
    .from('files')
    .select('*')
    .eq('clean', true)
    .range(randomOffset, randomOffset)
    .limit(1);

  // Add exclusion if there are IDs to exclude
  if (excludeIds.length > 0) {
    query = query.not('id', 'in', `(${excludeIds.join(',')})`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error('No files available in the pool');
  }

  return data[0];
};

export const updateFileScanResult = async (
  fileId: string,
  isClean: boolean,
  scanId?: string
): Promise<void> => {
  const { error } = await supabase
    .from('files')
    .update({
      scanned: true,
      clean: isClean,
      scan_id: scanId,
    })
    .eq('id', fileId);

  if (error) {
    throw new Error(error.message);
  }
};