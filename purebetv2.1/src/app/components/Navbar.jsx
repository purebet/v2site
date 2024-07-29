import Image from 'next/image';
import NavigationMenuDemo from './ComponentNav';
import { Poppins } from 'next/font/google'
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
  })

export default function Navbar() {
  return (
    <div className={`${poppins.className} z-[999999999]`}>


      {/* above mobile */}
    <div className="nav hidden my-10 md:flex text-white justify-between items-center px-4">
      <div className="flex ml-20 items-center">
        <Image width={62} height={42} src="/logo.png" alt="logo" />
      </div>
      <NavigationMenuDemo />
      <div className="flex mr-20 space-x-4">
        <button className="text-white">Log in</button>
        <button className="text-black bg-white rounded-[50px] p-2 px-4 font-">Get Started</button>
      </div>
    </div>




{/* mobile */}
<header className="flex md:hidden  z-[99999999] bg-black text-white h-16 w-full items-center justify-between px-4 md:px-6">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
      <Image width={62} height={42} src="/logo.png" alt="logo" />

      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        <Link href="#" className="hover:underline text-white hover:underline-offset-4" prefetch={false}>
          Hom
        </Link>
        <Link href="#" className="hover:underline text-white hover:underline-offset-4" prefetch={false}>
          About
        </Link>
        <Link href="#" className="hover:underline text-white hover:underline-offset-4" prefetch={false}>
          Services
        </Link>
        <Link href="#" className="hover:underline text-white hover:underline-offset-4" prefetch={false}>
          Contact
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden block">
            <Image src={"/logo.png"} width={100} height={100} alt='1' />
            <MenuIcon className="h-6 w-6 text-white bg-white" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="z-[99999999]" side="right ">
          <div className="grid gap-4 p-4 z-[99999999] text-white">
            <Link href="#" className="font-medium text-white hover:underline hover:underline-offset-4" prefetch={false}>
              Hom
            </Link>
            <Link href="#" className="font-medium text-white hover:underline hover:underline-offset-4" prefetch={false}>
              About
            </Link>
            <Link href="#" className="font-medium text-white hover:underline hover:underline-offset-4" prefetch={false}>
              Services
            </Link>
            <Link href="#" className="font-medium text-white hover:underline hover:underline-offset-4" prefetch={false}>
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>



    </div>

  );
  
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}


