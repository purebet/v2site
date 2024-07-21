import Image from 'next/image';
import NavigationMenuDemo from './ComponentNav';
import { Poppins } from 'next/font/google'
const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
  })

export default function Navbar() {
  return (
    <div className={poppins.className}>
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
    </div>
  );
}
