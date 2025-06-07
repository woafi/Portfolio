import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Socials from "@/components/Socials";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <div className="">
      <main className="container mx-auto px-5 md:px-0 ">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:pt-8 lg:pb-24">
          <div className="text-center lg:text-left order-2 lg:order-none">
            <h1 className="text-[48px] lg:text-[80px] leading-[1.1] font-semibold mb-6">
              Hello I'm <br /><span className="accent">Mohammad Woafi</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              A passionate Computer Science and Engineering student with a deep interest in building scalable, full-stack web applications and solving complex problems through efficient Data Structures and Algorithms.
            </p>
            {/* btn and socials */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <a href="/WoafisResume.pdf" download>
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2 hover:text-black lg:cursor-pointer"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
              </a>
              <div className="mb-8 lg:mb-0">
                <Socials containerStyle="flex gap-6"
                  iconStyle="w-9 h-9 border border-[#00ff99] rounded-full flex justify-center items-center text-[#00ff99] hover:bg-[#00ff99] hover:text-[#1c1c22] transition-all duration-300" />
              </div>
            </div>
          </div>
          {/* photo */}
          <div className="order-1 lg:order-none mb-8 lg:mb-0">
            <Photo />
          </div>
        </div>
        <Stats />
      </main>
    </div>
  );
}
