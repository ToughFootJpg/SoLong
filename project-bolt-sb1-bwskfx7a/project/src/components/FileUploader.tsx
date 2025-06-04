import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, File, Check, AlertCircle } from 'lucide-react';
import Button from './ui/Button';
import ProgressBar from './ui/ProgressBar';
import { useFileStore } from '../store/fileStore';
import { API_CONFIG } from '../config';

const FileUploader: React.FC = () => {
  const { uploadFile, uploadState, resetUploadState } = useFileStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    maxSize: API_CONFIG.MAX_FILE_SIZE,
    multiple: false,
  });
  
  const handleUpload = async () => {
    if (selectedFile) {
      await uploadFile(selectedFile);
      setSelectedFile(null);
    }
  };
  
  const handleReset = () => {
    setSelectedFile(null);
    resetUploadState();
  };
  
  const getBorderColor = () => {
    if (isDragAccept) return 'border-green-500';
    if (isDragReject) return 'border-red-500';
    if (isDragActive) return 'border-blue-500';
    return 'border-gray-300';
  };
  
  const renderUploadStatus = () => {
    if (uploadState.error) {
      return (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center">
            <AlertCircle className="text-red-500 mr-2 h-5 w-5" />
            <p className="text-red-700 text-sm">{uploadState.error}</p>
          </div>
        </div>
      );
    }
    
    if (uploadState.isUploading) {
      return (
        <div className="mt-4 space-y-2">
          <ProgressBar progress={uploadState.progress} showLabel />
          <p className="text-sm text-gray-600">
            {uploadState.progress < 100 ? 'Uploading...' : 'Upload complete!'}
          </p>
        </div>
      );
    }
    
    if (uploadState.progress === 100) {
      return (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center">
            <Check className="text-green-500 mr-2 h-5 w-5" />
            <p className="text-green-700 text-sm">Upload complete! You can now get your file.</p>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        <motion.div
          className={`p-6 border-2 border-dashed rounded-lg transition-colors ${getBorderColor()} bg-white`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="h-12 w-12 text-blue-500 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">
              {isDragActive
                ? 'Drop the file here...'
                : 'Drag & drop a file, or click to select'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload a file to get one in return
            </p>
            
            {selectedFile && (
              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md w-full">
                <div className="flex items-center">
                  <File className="text-gray-500 mr-2 h-5 w-5" />
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-700 truncate">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        
        {selectedFile && !uploadState.isUploading && uploadState.progress !== 100 && (
          <Button 
            variant="primary" 
            className="w-full" 
            onClick={handleUpload}
            icon={<Upload className="h-4 w-4" />}
            iconPosition="left"
          >
            Upload File
          </Button>
        )}
        
        {renderUploadStatus()}
        
        {(uploadState.error || uploadState.progress === 100) && (
          <Button 
            variant="outline" 
            className="w-full mt-2" 
            onClick={handleReset}
          >
            Upload Another File
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileUploader;