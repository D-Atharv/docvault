import { z } from "zod";

export const FileTypeSchema = z.enum([
  "All",
  "Folders",
  "Images",
  "Videos",
  "Documents",
  "Audio",
  "PDFs",
]);

export const ModifiedFilterSchema = z.enum([
  "Any time",
  "Today",
  "Last 7 days",
  "Last 30 days",
  "Last year",
  "Custom range",
]);

export const DateRangeSchema = z.object({
  start: z.string().optional(), // ISO string
  end: z.string().optional(),
});

export const DriveFilterSchema = z.object({
  q: z.string().optional(),
  type: FileTypeSchema.optional(),
  modified: ModifiedFilterSchema.optional(),
  range: DateRangeSchema.optional(),
});
