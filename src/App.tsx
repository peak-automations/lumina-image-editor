import React, { useState, useEffect } from 'react';
import { DropzoneArea } from './components/DropzoneArea';
import { ImageEditor } from './components/ImageEditor';
import { History, type HistoryItem } from './components/History';
import { Image as ImageIcon, History as HistoryIcon, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'history'>('editor');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('imageEditorHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to local storage when it changes
  useEffect(() => {
    localStorage.setItem('imageEditorHistory', JSON.stringify(history));
  }, [history]);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setActiveTab('editor');
  };

  const handleExport = (dataUrl: string, filename: string) => {
    const newItem: HistoryItem = {
      id: uuidv4(),
      url: dataUrl,
      filename,
      date: Date.now()
    };
    setHistory(prev => [newItem, ...prev]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-text-muted">
              Lumina Edit
            </h1>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-background rounded-lg p-1 border border-border">
            <button
              onClick={() => setActiveTab('editor')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeTab === 'editor' ? "bg-surface text-primary shadow-sm" : "text-text-muted hover:text-text hover:bg-surface/50"
              )}
            >
              <ImageIcon className="w-4 h-4" />
              Editor
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeTab === 'history' ? "bg-surface text-primary shadow-sm" : "text-text-muted hover:text-text hover:bg-surface/50"
              )}
            >
              <HistoryIcon className="w-4 h-4" />
              History
              {history.length > 0 && (
                <span className="ml-1.5 bg-border text-text-muted text-[10px] px-1.5 py-0.5 rounded-full">
                  {history.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'editor' && (
          <div className="h-[calc(100vh-8rem)]">
            {!selectedImage ? (
              <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Quick Image Adjustments</h2>
                  <p className="text-text-muted">
                    Crop, resize, convert formats, and blur text without leaving your browser. 
                    No credits required.
                  </p>
                </div>
                <DropzoneArea onImageSelect={handleImageSelect} />
              </div>
            ) : (
              <ImageEditor 
                imageFile={selectedImage} 
                onExport={handleExport}
                onCancel={() => setSelectedImage(null)}
              />
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <History 
            items={history} 
            onDelete={handleDeleteHistoryItem} 
            onClear={handleClearHistory} 
          />
        )}
      </main>
    </div>
  );
}
