"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"

const links = [
    {
        name: "home",
        path: "/",
    },
    {
        name: "services",
        path: "/services",
    },
    {
        name: "resume",
        path: "/resume",
    },
    {
        name: "projects",
        path: "/project",
    },
    
]

function Navblink() {
    const pathname = usePathname();
  return (
    <div className="flex gap-8 items-center">
      {links.map((link, index)=>(
        <Link href={link.path} key={index} 
        className={`${link.path === pathname && "accent border-b-2 border-[#00ff99]"} 
        capitalize font-medium accentHover transition-all`} >
            {link.name}
        </Link>
      ))}
      <Link href="/contact" className="hidden md:block">
        <Button className="cursor-pointer">Contact</Button>
      </Link>
    </div>
  )
}

export default Navblink
