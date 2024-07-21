'use client';
import { useState } from "react";
import Bottomnav from "../components/Bottomnav";
import './landing.css'
import Navbar from "../components/navbar";
import CustomCursor from "../CustomCursor";

export default function Landingpage(){
    return(<>
         <div className='bg-black blueEc flex items-center justify-center text-white landingpagecursor'>
       {/* <CustomCursor /> */}
      <div className="whiteEc"></div>
      </div>
      <Navbar />
      <a className="z-[99] text-white" href="/sports/home">click here to go to main page</a>
      <div className="md:hidden">
        <Bottomnav 
        />
      </div>
  
        </>)
}