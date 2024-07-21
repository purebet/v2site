'use client';
import { useState } from "react";
import Bottomnav from "../components/Bottomnav";
import './landing.css'
import Navbar from "../components/navbar";
import CustomCursor from "../CustomCursor";
import Main from './Main'
export default function Landingpage(){
    return(<>
         <div className='bg-black blueEc flex items-center justify-center text-white landingpagecursor'>
       {/* <CustomCursor /> */}
      <div className="whiteEc"></div>
      </div>
      <Navbar />
      <Main />
      <div className="md:hidden">
        <Bottomnav 
        />
      </div>
  
        </>)
}