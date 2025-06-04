import React from 'react';
import { motion } from 'framer-motion';
import { Download, Map, Calendar, FileText, ExternalLink } from 'lucide-react';
import Button from './ui/Button';
import { useFileStore } from '../store/fileStore';

const FileDownloader: React.FC = () => {
  const { downloadRandomFile, downloadState, resetDownloadState, uploadState } = useFileStore();
  
  const handleDownload = async () => {
    await downloadRandomFile();
  };
  
  const handleReset = () => {
    resetDownloadState();
  };
  
  const handleOpenFile = () => {
    if (downloadState.file?.url) {
      window.open(downloadState.file.url, '_blank');
    }
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const renderDownloadButton = () => {
    if (downloadState.isDownloading) {
      return (
        <div className="mt-4 text-sm text-gray-600 text-center">
          Finding your file...
        </div>
      );
    }
    
    if (!downloadState.file && !downloadState.error) {
      return (
        <Button
          variant="primary"
          className="w-full"
          onClick={handleDownload}
          icon={<Download className="h-4 w-4" />}
          iconPosition="left"
          disabled={uploadState.progress !== 100}
        >
          Get Your File
        </Button>
      );
    }
    
    return null;
  };
  
  const renderError = () => {
    if (downloadState.error) {
      return (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{downloadState.error}</p>
          <Button
            variant="outline"
            className="mt-3 w-full"
            onClick={handleReset}
          >
            Try Again
          </Button>
        </div>
      );
    }
    return null;
  };
  
  const renderFileInfo = () => {
    if (!downloadState.file) return null;
    
    const { file } = downloadState;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h3 className="font-medium text-lg text-gray-900 mb-4">Your File</h3>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <FileText className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-700">{file.name}</p>
              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            </div>
          </div>
          
          {file.location && (
            <div className="flex items-start">
              <Map className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-700">Origin</p>
                <p className="text-sm text-gray-500">
                  {file.location.city ? `${file.location.city}, ` : ''}
                  {file.location.country || 'Unknown'}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-700">Uploaded</p>
              <p className="text-sm text-gray-500">{formatDate(file.uploadedAt)}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleOpenFile}
            icon={<ExternalLink className="h-4 w-4" />}
            iconPosition="left"
          >
            Open File
          </Button>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        {!downloadState.file && !downloadState.error && (
          <motion.div
            className="p-6 border border-gray-200 rounded-lg bg-white text-center"
            whileHover={{ scale: 1.01 }}
          >
            <Download className="h-12 w-12 text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Get Your File</h3>
            <p className="mt-1 text-sm text-gray-500">
              {uploadState.progress === 100 
                ? "Your upload is complete! Click below to get your file."
                : "Upload a file first to receive one in return"}
            </p>
          </motion.div>
        )}
        
        {renderDownloadButton()}
        {renderError()}
        {renderFileInfo()}
      </div>
    </div>
  );
};

export default FileDownloader;