import { Account, DriveItem } from "@/types/index"

export const driveItems: DriveItem[] = [
  {
    id: "1",
    name: "Project Documents",
    type: "Documents", // Changed from "file"
    owner: "John Doe",
    dateModified: "2025-07-17T10:00:00Z", // Today, 10 AM IST
    fileSize: "1.2 MB",
  },
  {
    id: "2",
    name: "Team Meeting Notes",
    type: "Documents",
    owner: "Jane Smith",
    dateModified: "2025-07-16T15:30:00Z", // Yesterday
    fileSize: "500 KB",
  },
  {
    id: "3",
    name: "Financial Report.xlsx",
    type: "Spreadsheets", // Changed from "file"
    owner: "John Doe",
    dateModified: "2025-07-10T09:00:00Z", // Last 7 days
    fileSize: "2.5 MB",
  },
  {
    id: "4",
    name: "Vacation Photos",
    type: "Photos & images", // Changed from "file"
    owner: "Emily White",
    dateModified: "2025-07-17T09:00:00Z", // Today
    fileSize: "15 MB",
  },
  {
    id: "5",
    name: "Project Plan.pdf",
    type: "PDFs", // Changed from "file"
    owner: "David Green",
    dateModified: "2025-07-05T14:00:00Z", // Last 7 days
    fileSize: "1.0 MB",
  },
  {
    id: "6",
    name: "Customer Data",
    type: "Folders", // Changed from "folder"
    owner: "Alice Brown",
    dateModified: "2025-07-17T09:30:00Z", // Today
  },
  {
    id: "7",
    name: "Old Project Archives",
    type: "Archives (zip)",
    owner: "Bob Blue",
    dateModified: "2024-10-20T11:00:00Z", // Last year
    fileSize: "200 MB",
  },
  {
    id: "8",
    name: "Intro Presentation",
    type: "Presentations",
    owner: "Charlie Red",
    dateModified: "2025-06-15T16:00:00Z", // Last 30 days
    fileSize: "8 MB",
  },
  {
    id: "9",
    name: "Background Music.mp3",
    type: "Audio",
    owner: "Diana Yellow",
    dateModified: "2025-07-12T10:00:00Z", // Last 7 days
    fileSize: "4 MB",
  },
  {
    id: "10",
    name: "Product Demo.mp4",
    type: "Videos",
    owner: "Evan Purple",
    dateModified: "2025-05-20T13:00:00Z", // This year
    fileSize: "60 MB",
  },
  {
    id: "11",
    name: "Survey Form",
    type: "Forms",
    owner: "Fiona Orange",
    dateModified: "2025-04-01T08:00:00Z", // This year
    fileSize: "50 KB",
  },
  {
    id: "12",
    name: "Technical Drawings",
    type: "Drawings",
    owner: "George Black",
    dateModified: "2025-03-10T11:00:00Z", // This year
    fileSize: "3 MB",
  },
  {
    id: "13",
    name: "Company Intranet",
    type: "Sites",
    owner: "Hannah White",
    dateModified: "2025-02-01T09:00:00Z", // This year
  },
  {
    id: "14",
    name: "Quick Access Link",
    type: "Shortcuts",
    owner: "Ian Gray",
    dateModified: "2025-01-05T10:00:00Z", // This year
  },
  {
    id: "15",
    name: "Another Document.docx",
    type: "Documents",
    owner: "Julia Green",
    dateModified: "2025-06-01T14:00:00Z", // Last 30 days
    fileSize: "800 KB",
  },
  {
    id: "16",
    name: "Old Video Tutorial.mov",
    type: "Videos",
    owner: "Kevin Brown",
    dateModified: "2024-03-20T12:00:00Z", // Last year
    fileSize: "120 MB",
  },
  {
    id: "17",
    name: "Marketing Assets",
    type: "Folders",
    owner: "Laura Smith",
    dateModified: "2025-07-16T11:00:00Z", // Yesterday
  },
  {
    id: "18",
    name: "Client Proposal.pdf",
    type: "PDFs",
    owner: "Mark Johnson",
    dateModified: "2025-07-17T09:15:00Z", // Today
    fileSize: "2.0 MB",
  },
  {
    id: "19",
    name: "Quarterly Sales.xlsx",
    type: "Spreadsheets",
    owner: "Nancy Davis",
    dateModified: "2025-07-17T09:05:00Z", // Today
    fileSize: "1.5 MB",
  },
  {
    id: "20",
    name: "Team Brainstorm.pptx",
    type: "Presentations",
    owner: "Oscar White",
    dateModified: "2025-07-17T08:30:00Z", // Today
    fileSize: "7 MB",
  },
   {
    id: "21",
    name: "Team Brainstorm.pptx",
    type: "Presentations",
    owner: "Oscar White",
    dateModified: "2025-07-17T08:30:00Z", // Today
    fileSize: "7 MB",
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
