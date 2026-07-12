"use client";

import Navbar from "@/components/Navbar";
import Dashboard from "@/components/ai/Dashboard";
import Flow from "@/components/ai/Flow";
import Hero from "@/components/ai/Hero";

 
export default function Page() {
  return (
    <main className="ai-page  ">
      <Navbar />
      <Hero />
      <Flow />
      <Dashboard />
    </main>
  );
}
