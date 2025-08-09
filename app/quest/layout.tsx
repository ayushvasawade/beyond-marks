import React from "react";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import CartoonFooter from "@/components/CartoonFooter";

export default function QuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--lemonade-1)] text-[var(--lemonade-3)] flex flex-col">
      <DashboardNavbar />
      <main className="flex-1 w-full flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-5xl">{children}</div>
      </main>
      <CartoonFooter />
    </div>
  );
}

