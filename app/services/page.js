"use client"

import { BsArrowDownRight } from "react-icons/bs"  // Fixed import name
import Link from "next/link"
import { motion } from "framer-motion"  // Added motion import

const services = [
  {
    num: "01",
    title: "Web Development",
    desc: "Designing and developing clean, efficient websites that work on all devices",
    href: "/contact",
  },
  {
    num: "02",
    title: "UI/UX Design",
    desc: "Designing intuitive and engaging user interfaces.",
    href: "/contact",
  },
]

function Services() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 lg:py-0">
      <div className="container mx-auto px-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => (
            <div key={index} className="flex flex-col flex-1 justify-center gap-6 group">
              <div className="w-full flex items-center justify-between">
                <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-accent transition-all duration-500">
                  {service.num}
                </div>
                <Link
                  href={service.href}
                  className="w-[70px] h-[70px] rounded-full bg-white  flex items-center justify-center group-hover:bg-[#00ff99] transition-all duration-500 hover:-rotate-45"
                >
                  <BsArrowDownRight className="text-[#1c1c22] text-3xl"/>
                </Link>
              </div>

              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-[#00ff99] transition-all duration-500">
                {service.title}
              </h2>

              <p className="text-white/60">
                {service.desc}
              </p>

              <div className="border-b border-white/20 w-full mt-8"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services