import { Account, DriveItem } from "@/types/index"

export const driveItems: DriveItem[] = [
  // --- Root Level Items (parentId: null) ---
  {
    id: "folder-1",
    name: "🚀 Project Alpha",
    type: "Folders",
    owner: "Alice",
    dateModified: "2025-07-15",
    parentId: null,
  },
  {
    id: "folder-2",
    name: "Marketing Materials",
    type: "Folders",
    owner: "Bob",
    dateModified: "2025-06-20",
    parentId: null,
  },
  {
    id: "file-1",
    name: "Annual Report 2025.pdf",
    type: "PDFs",
    owner: "Alice",
    dateModified: "2025-07-10",
    fileSize: "5.2 MB",
    parentId: null,
  },
  {
    id: "file-2",
    name: "Onboarding Video.mp4",
    type: "Videos",
    owner: "Charlie",
    dateModified: "2025-05-01",
    fileSize: "128 MB",
    parentId: null,
  },

  // --- Items inside "Project Alpha" (parentId: "folder-1") ---
  {
    id: "folder-3",
    name: "Design Assets",
    type: "Folders",
    owner: "Alice",
    dateModified: "2025-07-16",
    parentId: "folder-1",
  },
  {
    id: "file-3",
    name: "Meeting Notes - July.docx",
    type: "Documents",
    owner: "Alice",
    dateModified: "2025-07-15",
    fileSize: "120 KB",
    parentId: "folder-1",
  },
  {
    id: "file-4",
    name: "Budget Q3.xlsx",
    type: "Spreadsheets",
    owner: "Bob",
    dateModified: "2025-07-14",
    fileSize: "78 KB",
    parentId: "folder-1",
  },

  // --- Items inside "Design Assets" (parentId: "folder-3") ---
  {
    id: "file-5",
    name: "Logo_Final_v3.svg",
    type: "Photos & images",
    owner: "Alice",
    dateModified: "2025-07-16",
    fileSize: "1.1 MB",
    parentId: "folder-3",
  },
  {
    id: "file-6",
    name: "Brand Guidelines.pdf",
    type: "PDFs",
    owner: "Alice",
    dateModified: "2025-07-15",
    fileSize: "3.4 MB",
    parentId: "folder-3",
  },
];

export const otherAccounts: Account[] = [
  { name: "Atharv Dewangan", email: "atharv.codes04@gmail.com", avatar: "🏕️" },
  {
    name: "Atharv",
    email: "atharvdewanganakd298suncity@gmail.com",
    avatar: "🎵",
  },
  {
    name: "Atharv Dewangan 22BIT0033",
    email: "atharv.dewangan2022@vitstudent.ac.in",
    avatar: "A",
  },
];
