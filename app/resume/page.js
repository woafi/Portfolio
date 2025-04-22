"use client"
import { Description } from "@radix-ui/react-dialog"
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs, FaFigma } from "react-icons/fa"
import { SiTailwindcss, SiNextdotjs } from "react-icons/si"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

const about = {
  title: "About Me",
  description: "I'm Mohammad Woafi, a passionate Software Engineering student with a strong foundation in Data Structures and Algorithms and Full-Stack Web Development. My expertise lies in designing and implementing efficient data structures and algorithms and working with technologies like React, Next.js and JavaScript. Currently, I'm diving deep into Next.js enhance my backend expertise while continuously refining my front-end skills. My goal is to build impactful software solutions and grow as a professional in the software engineering domain.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Mohammad Woafi"
    },
    {
      fieldName: "Phone",
      fieldValue: "+8801315939768"
    },
    {
      fieldName: "Nationality",
      fieldValue: "Bangladeshi"
    },
    {
      fieldName: "Email",
      fieldValue: "woafisun@yahoo.com"
    },
    {
      fieldName: "Language",
      fieldValue: "English, Bengali"
    },
  ]
}

const experience = {
  icon: "/assets/resume/badge.svg",
  title: "Experience",
  description: "I have experience in Full-Stack Web Development, specializing in creating dynamic and responsive web applications. My expertise includes working with technologies such as React, Next.js, and JavaScript. I am passionate about building user-friendly interfaces and ensuring seamless user experiences.",
  items: [
    {
      company: "Freelance",
      position: "Full-Stack Developer",
      duration: "2024 - Present",
    },
  ]
}

const education = {
  icon: "/assets/resume/cap.svg",
  title: "Education",
  description: "",
  items: [
    {
      institution: " Bangladesh Institute of Science and Technology",
      degree: "BSc",
      duration: "2022 - present",
      grade: "CGPA-3.1",
    },
    {
      institution: "Government Keshab Chandra College, Jhenaidah",
      degree: "HSC",
      duration: "2018-2020",
      grade: "GPA-5.00",
    },
    {
      institution: "Jhenidah Goverment Boys School",
      degree: "SSC",
      duration: "2016 - 2018",
      grade: "GPA-5.00",
    },
  ]
}

const skills = {
  title: "Skills",
  description: "",
  items: [
    {
      name: "HTML",
      icon: <FaHtml5 />,
    },
    {
      name: "CSS",
      icon: <FaCss3 />,
    },
    {
      name: "JavaScript",
      icon: <FaJs />,
    },
    {
      name: "Figma",
      icon: <FaFigma />,
    },
    {
      name: "Node.js",
      icon: <FaNodeJs />,
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss />,
    },
    {
      name: "React.js",
      icon: <FaReact />,
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs />,
    },
  ]
}

function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.5, ease: 'easeIn' },
      }}
      className="min-h-[80vh] flex flex-col items-center py-12 lg:py-25">
      <div className="container mx-auto px-5 lg:px-0">
        <Tabs defaultValue="about" className="flex flex-col lg:flex-row gap-[60px]">
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto lg:mx-0 ">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          {/* Experience Tab */}
          <TabsContent value="experience" className="w-full" >
            <div className="px-4 pt-4 flex flex-col gap-[30px] text-center lg:text-left">
              <h2 className="text-4xl font-bold">{experience.title}</h2>
              <p className=" text-white/60 mx-auto lg:mx-0">{experience.description}</p>
              <ScrollArea className="h-[400px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  {experience.items.map((item, index) => (
                    <div key={index} className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                      <h3 className="font-bold accent">{item.company}</h3>
                      <p className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.position}</p>
                      <div className="flex items-center gap-3">
                        <span className="w-[6px] h-[6px] rounded-full bg-[#00ff99]"></span>
                        <p className="text-white/60">{item.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="w-full">
            <div className="px-4 pt-4 flex flex-col gap-[30px] text-center lg:text-left">
              <h2 className="text-4xl font-bold">{education.title}</h2>
              <ScrollArea className="max-h-[500px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  {education.items.map((item, index) => (
                    <div key={index} className="bg-[#232329] min-h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                      <h3 className="font-bold accent">{item.degree}</h3>
                      <span className="text-white">{item.duration}</span>
                      <p className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{item.institution}</p>
                      <div className="flex items-center gap-3">
                        <span className="w-[6px] h-[6px] rounded-full bg-[#00ff99]"></span>
                        <p className="text-white/60">Grade: {item.grade}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="w-full h-full">
            <div className="px-4 pt-4 flex flex-col gap-[30px] text-center lg:text-left">
              <h2 className="text-4xl font-bold">{skills.title}</h2>
              <TooltipProvider delayDuration={100}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gap-[30px] gap-4">
                  {skills.items.map((skill, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group hover:text-[#00ff99] transition-all duration-300 cursor-pointer">
                          <span className="text-6xl">{skill.icon}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{skill.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </TabsContent>
          {/* About Tab */}
          <TabsContent value="about" className="w-full text-center lg:text-left" >
            <div className="px-4 pt-4 flex flex-col gap-[30px]">
              <h2 className="text-4xl font-bold">{about.title}</h2>
              <p className=" text-white/60 mx-auto lg:mx-0">{about.description}</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6  mx-auto lg:mx-0">
                {about.info.map((item, index) => (
                  <div key={index} className="flex items-center justify-center lg:justify-start gap-4">
                    <span className="text-white/60">{item.fieldName}: </span>
                    <span className="text-xl">{item.fieldValue}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default Resume