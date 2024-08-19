import Image from "next/image";
import footer_logo from "../../../public/footer_logo.svg";
import discord_footer from "../../../public/discord_footer.svg";
import x from "../../../public/x.svg";
import ig from "../../../public/instagram.svg";
import medium from "../../../public/medium.svg";
import copyright from "../../../public/copyright.svg";
import footer_gradient from "../../../public/footer_gradient.svg";
import footer_gradient_mob from "../../../public/footer_gradient_mob.svg";

export default function Footer() {
  return (
    <main className="relative">
      <div className="absolute bottom-0 right-0 hidden w-full -z-9 md:block">
        <Image alt="alt" src={footer_gradient} className="w-full" />
      </div>
      <div className="absolute bottom-[17%] right-0 w-full h-[400px] -z-9 md:hidden">
        <Image alt="alt" src={footer_gradient_mob} className="w-full h-[500px]" />
      </div>

      <div className="px-6 pt-16 mt-10 md:mt-0 sm:px-12 md:px-20 md:pb-12 lg:px-28">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center md:flex-row">
            <Image
              src={footer_logo}
              className="w-[127px] h-[82px] md:w-[147px] md:h-[95px] mb-8 md:mb-0"
            />
            <div className="flex flex-col items-center gap-6 mb-4 text-sm md:items-start font-poppins md:mb-0">
              <div className="flex gap-6">
                <p>Docs</p>
                <p>Onboarding</p>
                <p>Blog</p>
                <p>Try Swipe!</p>
              </div>

              <div className="max-w-min border-[1px] py-1 px-4 border-[#A5A5A5] rounded-full ">
                <a
                  className="text-[12px]"
                  href="mailto:purebetprotocol@gmail.com"
                >
                  purebetprotocol@gmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mb-5 md:mb-0">
            <Image alt="alt" src={ig} />
            <Image alt="alt" src={medium} />
            <Image alt="alt" src={x} />
            <Image alt="alt" src={discord_footer} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 mt-5">
          <Image alt="alt" src={copyright} />
          <p className="text-sm font-poppins">
            2024 Purebet. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
