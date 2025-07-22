/**
 * Checks if a file is editable based on its extension.
 * @param filename - The name of the file.
 * @returns True if the file has a recognized editable extension.
 */
export const isEditableFile = (filename: string): boolean => {
  const editableExtensions = [
    // Web
    ".html", ".css", ".js", ".ts", ".jsx", ".tsx", ".json", ".xml", ".yml", ".yaml",
    // General Purpose
    ".py", ".java", ".c", ".h", ".cpp", ".hpp", ".cs", ".go", ".rs", ".rb", ".php",
    // Mobile
    ".swift", ".kt", ".kts",
    // Shell & Scripts
    ".sh", ".bash", ".ps1",
    // Database
    ".sql",
    // DevOps
    ".dockerfile", "Dockerfile",
    // Text & Docs
    ".md", ".txt", ".rtf",
  ];
  const lowerCaseFilename = filename.toLowerCase();
  // Handle files with no extension like 'Dockerfile'
  if (editableExtensions.includes(filename)) return true;
  return editableExtensions.some(ext => lowerCaseFilename.endsWith(ext));
};

/**
 * Gets the Monaco Editor language identifier from a filename.
 * @param filename - The name of the file.
 * @returns The language identifier string (e.g., 'python', 'javascript').
 */
export const getLanguageFromExtension = (filename: string): string => {
    const nameParts = filename.toLowerCase().split('.');
    const extension = `.${nameParts[nameParts.length - 1]}`;

    const langMap: { [key: string]: string } = {
        '.html': 'html',
        '.css': 'css',
        '.js': 'javascript',
        '.jsx': 'javascript',
        '.ts': 'typescript',
        '.tsx': 'typescript',
        '.json': 'json',
        '.xml': 'xml',
        '.yml': 'yaml',
        '.yaml': 'yaml',
        '.py': 'python',
        '.java': 'java',
        '.c': 'c',
        '.h': 'c',
        '.cpp': 'cpp',
        '.hpp': 'cpp',
        '.cs': 'csharp',
        '.go': 'go',
        '.rs': 'rust',
        '.rb': 'ruby',
        '.php': 'php',
        '.swift': 'swift',
        '.kt': 'kotlin',
        '.kts': 'kotlin',
        '.sh': 'shell',
        '.bash': 'shell',
        '.ps1': 'powershell',
        '.sql': 'sql',
        '.dockerfile': 'dockerfile',
        '.md': 'markdown',
        '.txt': 'plaintext',
        '.rtf': 'plaintext',
    };

    if (filename === 'Dockerfile') return 'dockerfile';
    return langMap[extension] || 'plaintext';
};