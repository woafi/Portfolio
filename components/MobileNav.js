"use client"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { CiMenuFries } from "react-icons/ci"

const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Resume", path: "/resume" },
    { name: "Projects", path: "/project" },
    { name: "Contact", path: "/contact" },
]

function MobileNav() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="flex items-center justify-center">
                <CiMenuFries className="text-[32px] accent" />
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <div className="mt-32 mb-40 text-center text-2xl">
                    <Link href="/" onClick={() => setOpen(false)}>
                        <div className="text-3xl">
                            <span className="accent">W</span><span>oafi</span><span>.</span>
                        </div>
                    </Link>
                </div>
                <nav className="flex flex-col justify-center items-center gap-8">
                    {links.map((link, index) => (
                        <Link
                            href={link.path}
                            key={index}
                            onClick={() => setOpen(false)}
                            className={`${link.path === pathname ? "accent border-b-2 border-[#00ff99]" : ""} 
                                capitalize font-medium accentHover transition-all`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
