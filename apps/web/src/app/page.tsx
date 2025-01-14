import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { WhyIBuit } from "@/components/sections/why-i-built";
import { WhatIsRag } from "@/components/sections/what-is-rag";
import { Community } from "@/components/sections/community";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  description:
    "The open-source alternative to Carbon.ai. Build powerful RAG applications with any data source, at any scale.",
};

export default async function Home() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  return (
    <main>
      <Header isLoggedIn={!!user?.user} />
      <Hero />
      <WhyIBuit />
      <WhatIsRag />
      <Community />
      <CTA />
      <Footer />
    </main>
  );
}
