"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Hyperspeed from "@/components/ui/LoadingHyperSpeed";

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate a loading process (e.g., fetching data, initializing)
    // and then redirect after 5 seconds.
    const timer = setTimeout(() => {
      router.push("/drive?view=grid");
    }, 2500); // 2500ms = 2.5 seconds

    // Cleanup the timer if the component unmounts before the time is up
    return () => clearTimeout(timer);
  }, [router]); // The effect depends on the router object

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
    >
      <Hyperspeed
      // You can pick any preset you defined
      />
    </div>
  );
}
