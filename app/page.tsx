import { redirect } from "next/navigation";

export default function Home() {
  // Always redirect from the root to your drive's base URL
  redirect("/drive?view=grid");
}