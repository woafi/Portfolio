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
        name: "React",
      },
      {
        name: "Tailwind CSS",
      },
      {
        name: "Framer Motion",
      },
    ],
    image: "/assets/work/project-1.png",
    live: "https://portfolio-ten-lime-87.vercel.app/",
    github: "https://github.com/woafi/Portfolio",
  },
  {
    num: "02",
    title: "PassFort",
    description: "PassFort is a simple and secure password manager built using React, Tailwind Css, Express, Node.js, RESTful API, and MongoDB. It allows users to store multiple website credentials securely with features like password visibility toggle, edit, delete, and copy functionality. The application is deployed using MongoDB Atlas (database), Render (backend), and Vercel (frontend).",
    stack: [
      {
        name: "React",
      },
      {
        name: "Tailwind CSS",
      },
      {
        name: "MongoDB",
      },
      {
        name: "Express.js",
      },
      {
        name: "RESTful API,",
      },
    ],
    image: "/assets/work/project-2.png",
    live: "https://pass-fort-zeta.vercel.app/",
    github: "https://github.com/woafi/PassFort",
  },
  {
    num: "03",
    title: "Task Manager",
    description: "A React-based task management application that helps users organize and track their tasks efficiently. The application provides a clean and intuitive interface for managing daily tasks with persistent storage functionality",
    stack: [
      {
        name: "React",
      },
      {
        name: "Tailwind CSS",
      },
      {
        name: "JavaScript",
      },

    ],
    image: "/assets/work/project-3.png",
    live: "https://task-manger-ashy.vercel.app/",
    github: "https://github.com/woafi/Task-Manager",
  },
  {
    num: "04",
    title: "Web Music Player",
    description: "A web-based music player inspired by Spotify. It allows users to browse different libraries, select songs from a playlist, and enjoy functionalities such as play, pause, volume control, seek bar, mute, and responsive design with a mobile-friendly hamburger menu. Built using HTML, CSS, and JavaScript.",
    stack: [

      {
        name: "JavaScript",
      },
      {
        name: "Css",
      },
      {
        name: "HTML",
      },

    ],
    image: "/assets/work/project-4.png",
    live: "http://spotifywebplayer.42web.io/",
    github: "https://github.com/woafi/Web-Music-Player",
  },

  {
    num: "05",
    title: "CurrencyXchange",
    description: "CurrencyXchange is a simple and intuitive web-based currency converter that allows users to convert between different currencies in real-time. Built using HTML, CSS, and JavaScript, this project leverages a public API to fetch the latest exchange rates.",
    stack: [

      {
        name: "JavaScript",
      },
      {
        name: "Css",
      },
      {
        name: "HTML",
      },

    ],
    image: "/assets/work/project-5.png",
    live: "https://woafi.github.io/CurrencyXchange/index.html",
    github: "https://github.com/woafi/CurrencyXchange",
  },
  {
    num: "06",
    title: "Netflix-Clone",
    description: "A responsive Netflix homepage clone built with HTML and CSS, designed to replicate the look and feel of the original interface. This project is perfect for practicing front-end development and web design skills.",
    stack: [
      {
        name: "Css",
      },
      {
        name: "HTML",
      },

    ],
    image: "/assets/work/project-6.png",
    live: "https://woafi.github.io/Netflix-Clone/index.html",
    github: "https://github.com/woafi/Netflix-Clone",
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
              {projects.map((project, index) => (
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
                btnStyles="bg-[#00ff99] hover:bg-[#2cbd83] text-[#1c1c22] text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all" />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Project
