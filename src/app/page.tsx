"use client";

import Header from "../components/Header";
import StudioHero from "../components/StudioHero";
import StudioProducts from "../components/StudioProducts";
import StudioAbout from "../components/StudioAbout";
import StudioContact from "../components/StudioContact";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Header />
      <StudioHero />
      <StudioAbout />
      <StudioProducts />
      <StudioContact />
    </main>
  );
}
