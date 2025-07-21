// components/drive/FileViewer.tsx

"use client";

import React from "react";
import { X, Share2, Download, Info } from "lucide-react";
import { DriveItem, FileType } from "@/types";
import { getFileIcon } from "@/lib/file_icon";

interface FileViewerProps {
  file: DriveItem;
  onClose: () => void;
}

// Placeholder content to simulate file preview
const fileContentPlaceholder = `Creating your own stock market is a complex undertaking, and there are several prerequisites you should take care of to ensure the success of the venture. Here are some considerations:

1.  Legal Compliance: Before starting a stock market, it's important to understand the legal requirements and regulations that must be followed...
2.  Financial Resources: Creating a stock market requires significant financial resources to cover the costs...
3.  Technology Infrastructure: A stock market requires a sophisticated technology infrastructure to handle trading, settlement, and other functions...
4.  Trading Platform: You will need to develop a user-friendly trading platform that allows traders to buy and sell stocks...
5.  Market Data: You will need to have access to real-time market data to provide accurate information to traders...
6.  Marketing Strategy: You will need to develop a strong marketing strategy to attract traders to your platform...
7.  Staffing: You will need to hire a team of experienced professionals to manage your stock market...

Overall, creating your own stock market is a challenging and complex undertaking that requires careful planning, significant financial resources, and a deep understanding of the markets and regulatory requirements.
`;

const FileViewer: React.FC<FileViewerProps> = ({ file, onClose }) => {
  const Icon = getFileIcon(file.type);

  // Simple logic to determine if we can show a text-based preview
  const previewableTypes: FileType[] = [
    "Documents",
    "PDFs",
    "Presentations",
    "Spreadsheets",
    "Photos & images",
    "Drawings",
    "Audio",
    "Videos",
    "xlsx", // or "Vids" depending on what you use consistently
  ];

  const canShowPreview = previewableTypes.includes(file.type);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#1e293b] text-slate-100 rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-3 border-b border-slate-600 flex-shrink-0">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="text-blue-300" />}
            <span className="font-semibold">{file.name}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <button className="p-2 rounded-full hover:bg-slate-700/60 transition-colors">
              <Download size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-700/60 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-700/60 transition-colors">
              <Info size={20} />
            </button>
            <div className="w-px h-6 bg-slate-600 mx-2"></div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-700/60 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-custom">
          {canShowPreview ? (
            <pre className="text-slate-300 whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {fileContentPlaceholder}
            </pre>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              {Icon && <Icon size={80} className="mb-4 text-slate-500" />}
              <h2 className="text-xl font-semibold">No preview available</h2>
              <p>
                Preview for &apos;{file.name}&apos; ({file.type}) is not
                supported.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FileViewer;
