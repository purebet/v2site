'use client';
import { useState } from "react";
import './landing.css'
import Navbar from "../components/navbar";
import CustomCursor from "../CustomCursor";
import Main from './Main'
import Unlock from "./Unlock";
import EasySteps from "./EasySteps/EasySteps";
export default function Landingpage(){
    return(<>
         <div className='bg-black blueEc -z-[0] flex items-center justify-center text-white landingpagecursor'>
       {/* <CustomCursor /> */}
      <div className="whiteEc z-[]"></div>
      </div>
      <Navbar />
      <Main />
      <div >
      <Unlock/>
      <EasySteps />
      </div>
  
        </>)
}