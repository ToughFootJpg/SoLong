/*
  # Initial FileSwap Database Schema

  1. New Tables
    - `files`: Stores file metadata including:
      - `id` (uuid, primary key)
      - `name` (text, file name)
      - `type` (text, file mime type)
      - `size` (bigint, file size in bytes)
      - `path` (text, storage path)
      - `location` (jsonb, location data)
      - `uploaded_at` (timestamptz, upload timestamp)
      - `scanned` (boolean, virus scan status)
      - `clean` (boolean, virus scan result)
      - `scan_id` (text, virus scan ID)
  
  2. Security
    - Enable RLS on `files` table
    - Add policies for public read access
    - Add policies for authenticated users to insert
*/

-- Create files table
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  size bigint NOT NULL,
  path text NOT NULL,
  location jsonb DEFAULT NULL,
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  scanned boolean NOT NULL DEFAULT false,
  clean boolean NOT NULL DEFAULT false,
  scan_id text DEFAULT NULL
);

-- Enable Row Level Security
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow public read access to clean files"
  ON files
  FOR SELECT
  TO public
  USING (clean = true);

CREATE POLICY "Allow authenticated users to insert files"
  ON files
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow service role to update files"
  ON files
  FOR UPDATE
  TO service_role
  USING (true);