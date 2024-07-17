"use client"
import * as React from "react";
import AccountInfo from "../walletcardmobile/AccountInfo";
import { IoMdClose } from "react-icons/io";
import Link from 'next/link'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


export default function Bottomnav() {

  
  const [snap, setSnap] = React.useState("500px");


  return (
    <>
      <div
        id="bottomNav"
        className="flex w-full  fixed bottom-0 flex-col justify-center text-xs text-center whitespace-nowrap text-neutral-400"
    
      
      >
        <div className="flex overflow-hidden b relative flex-col gap-5 items-start px-7 py-3 w-full  aspect-[6.72]  fill-[linear-gradient(180deg,#181818_0%,#000_100%)] stroke-[1px] stroke-neutral-800">
          <img
            // style={{clipPath: "polygon(50% 97%, 67% 84%, 100% 83%, 100% 100%, 0 100%, 0 83%, 29% 83%)"}}
            loading="lazy"
            src="/boxbn.png"
            className="object-cover absolute inset-0 w-full h-full"
          />
          <div className="flex relative gap-5 justify-between w-full">
            <div className="flex flex-col items-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/25899e40d43f33bc96f465d42faeb0ab8b834d5002f5990e67cbb59efd039170?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                className="aspect-[1.54] w-[37px]"
              />
              <div>Premier</div>
            </div>
            <div className="flex flex-col items-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/46bc5630bbdb13c05d7a479d6ca4092e5ac36da67a650059fb77b987ceb78734?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                className="w-6 aspect-square"
              />
              <div>EPL</div>
            </div>
            <div className="flex flex-col items-center relative">
              <img
                loading="lazy"
                src="/profilebottomnav.png"
                className="w-12 z-50 aspect-square absolute left-1/2 transform -translate-x-1/2 bottom-10"
                alt="Profile"
              />
              {/* <div>EPL</div> */}
            </div>
            <div className="flex flex-col items-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/98ac0a949c2a80c1519195ffccf45a663d6bd6f67223194eb40bbcbe4e23edd7?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                className="w-6 aspect-square"
              />
              <div>Basketball</div>
            </div>
            <Link href="/sports/Soccer">
            <div className="flex flex-col items-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8314568bdd28822c04f60009a7b23bd7e7521e366cb4b27ba123458292bf9875?apiKey=d1ee9f6275604677bd2583ecebeab853&"
                className="aspect-[1.41] w-[34px]"
              />
              <div>Soccer</div>
            </div>
            </Link>
          </div>
        </div>
      </div>

      <Drawer>
  <DrawerTrigger> <div>
        <img
          loading="lazy"
          src="/profilebottomnav.png"
          className="w-20 aspect-square fixed left-1/2 transform -translate-x-1/2 bottom-10"
          alt="Profile"
        />
      </div></DrawerTrigger>
  <DrawerContent>
  <AccountInfo />
   
  </DrawerContent>
</Drawer>

      {/* <Drawer.Root>
      <Drawer.Trigger asChild>
      <div>
        <img
          loading="lazy"
          src="/profilebottomnav.png"
          className="w-20 aspect-square fixed left-1/2 transform -translate-x-1/2 bottom-10"
          alt="Profile"
        />
      </div>
      </Drawer.Trigger> 
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black" />
        <Drawer.Content className=" z-20 flex flex-col  fixed bottom-[400px] left-0 right-0">
     
        
          
          
          <AccountInfo />
        
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root> */}
    </>
  );
}
