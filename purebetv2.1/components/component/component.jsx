
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function Component() {
  return (
    (<header className="flex h-16 bg-black text-white w-full items-center justify-between px-4 md:px-6">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
      <Image width={62} height={42} src="/logo.png" alt="logo" />
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        <Link
          href="#"
          className="hover:underline hover:underline-offset-4"
          prefetch={false}>
          Home
        </Link>
        <Link
          href="#"
          className="hover:underline hover:underline-offset-4"
          prefetch={false}>
          About
        </Link>
        <Link
          href="#"
          className="hover:underline hover:underline-offset-4"
          prefetch={false}>
          Services
        </Link>
        <Link
          href="#"
          className="hover:underline hover:underline-offset-4"
          prefetch={false}>
          Contact
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden bg-transparent">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            <Link
              href="#"
              className="font-medium hover:underline hover:underline-offset-4"
              prefetch={false}>
              Home
            </Link>
            <Link
              href="#"
              className="font-medium hover:underline hover:underline-offset-4"
              prefetch={false}>
              About
            </Link>
            <Link
              href="#"
              className="font-medium hover:underline hover:underline-offset-4"
              prefetch={false}>
              Services
            </Link>
            <Link
              href="#"
              className="font-medium hover:underline hover:underline-offset-4"
              prefetch={false}>
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>)
  );
}

function MenuIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>)
  );
}


function MountainIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>)
  );
}


function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
