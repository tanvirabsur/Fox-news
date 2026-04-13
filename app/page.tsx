'use client';

import FeedNews from "@/Components/FeedNews";
import FeedSlider from "@/Components/FeedSlider";


export default function Home() {


  return (
    <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Featured Article */}
        <FeedNews />

        {/* Sidebar */}
        <FeedSlider />

      </div>
    </main>
  );
}
