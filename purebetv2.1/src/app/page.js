'use client';
import Bottomnav from "./components/Bottomnav";
import { useState } from "react";

export default function Home() {

  return (
    <div className='bg-black text-white'>
      <a href="/sports/home">click here to go to main page</a>
      <div className="md:hidden">
        <Bottomnav 
        />
      </div>
    </div>
  );
}
