"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    title: "Portfolio",
    description: "My personal portfolio website showcasing my skills and projects.",
    stack: [
      {
        name: "Next.js",
      },
      {
        name: "Tailwind CSS",
      },
      {
        name: "Framer Motion",
      },
    ],
    image: "/assets/work/project-6.png",
    live: "",
    github: "",
  },
  {
    num: "02",
    title: "asdasd",
    description: "My personal portfolio website showcasing my skills and projects.",
    stack: [
      {
        name: "Next.js",
      },
      {
        name: "Tailwind CSS",
      },
      {
        name: "Framer Motion",
      },
    ],
    image: "/assets/work/project-5.png",
    live: "",
    github: "",
  },
];


function Project() {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  }
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 lg:px-0"
    >
      <div className="container mx-auto px-5 lg:px-0">
        <div className="flex flex-col lg:flex-row lg:gap-[30px]">
          <div className="w-full lg:w-[50%] lg:h-[460px] flex flex-col xl:justify-between order-2 lg:order-none">
            <div className="flex flex-col gap-[30px] h-1/2">
              {/* outline number */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              <div className="group"> {/* Add group class here */}
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-[#00ff99] transition-all duration-500 capitalize">
                  {project.title}
                </h2>
              </div>
              {/* project description */}
              <p className="text-white/60">{project.description}</p>
              <ul className="flex gap-4">
                {project.stack.map((item, index) => (
                  <li key={index} className="text-xl accent">{item.name}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              {/* border */}
              <div className="border border-white/20"></div>
              <div className="flex items-center gap-4">
                <Link href={project.live} target="_blank" className="">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-[#00ff99]" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black">Live Demo</TooltipContent>
                    </Tooltip>
                  </TooltipProvider >
                </Link>
                <Link href={project.github} target="_blank" className="">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-[#00ff99]" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white text-black">Github Repository</TooltipContent>
                    </Tooltip>
                  </TooltipProvider >
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="lg:h-[520px] mb-12"
              onSlideChange={handleSlideChange}>
              {projects.map((project, index)=>(
                <SwiperSlide key={index} className="w-full">
                 <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                    {/* overlay */}
                    <div></div>
                    {/* image */}
                    <div className="relative w-full h-full">
                    <Image src={project.image} fill className="object-cover object-left" alt="" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              {/* Slider Button */}
              <WorkSliderBtns containerStyle="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] lg:bottom-0 z-20 w-full justify-between lg:w-max lg:justify-none"
              btnStyles="bg-[#00ff99] hover:bg-[#2cbd83] text-[#1c1c22] text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"/>
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Project
