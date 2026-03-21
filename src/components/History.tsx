import React from 'react';
import { Download, Trash2, Clock } from 'lucide-react';

export interface HistoryItem {
  id: string;
  url: string;
  filename: string;
  date: number;
}

interface HistoryProps {
  items: HistoryItem[];
  onDelete: (id: string) => void;
  onClear: () => void;
}

export function History({ items, onDelete, onClear }: HistoryProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-text-muted">
        <Clock className="w-12 h-12 mb-4 opacity-50" />
        <p>No editing history yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Edits</h2>
        <button 
          onClick={onClear}
          className="text-sm text-primary hover:text-primary-hover transition-colors"
        >
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-surface rounded-xl border border-border overflow-hidden group relative">
            <div className="aspect-square bg-background relative">
              <img 
                src={item.url} 
                alt={item.filename} 
                className="w-full h-full object-contain p-2"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <a 
                  href={item.url} 
                  download={item.filename}
                  className="p-2 bg-surface rounded-full hover:bg-primary hover:text-white transition-colors"
                  title="Download"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => onDelete(item.id)}
                  className="p-2 bg-surface rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium truncate" title={item.filename}>{item.filename}</p>
              <p className="text-xs text-text-muted mt-1">
                {new Date(item.date).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
