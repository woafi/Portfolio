"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import { motion } from "framer-motion";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+880) 131 593 9768",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "woafisun@yahoo.com",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Address",
    description: "Dhaka, Bangladesh",
  }
]

function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' },
      }}
      className="py-6">
      <div className="container mx-auto px-5 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-[30px]">
          <div className="lg:w-[54%] order-2 lg:order-none">
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl " action="">
              <h3 className="text-4xl accent">Let's work together</h3>
              <p className="text-white/60">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, omnis explicabo laboriosam reprehenderit sit assumenda aut id.
              </p>
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="firstname" placeholder="Firstname" />
                <Input type="lastname" placeholder="Lastname" />
                <Input type="email" placeholder="Email address" />
                <Input type="phone" placeholder="Phone number" />
              </div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="est">
                      Web Development
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* Textarea */}
              <Textarea className="h-[200px]" placeholder="Type your message here." />
              <Button size="md" className="max-w-40 ">Send message</Button>
            </form>
          </div>
          {/* info */}
          <div className="flex-2 flex item-center justify-center order-1 lg:order-none mb-8 lg:mb-0">
            <ul className="flex flex-col gap-10 justify-center">
              {info.map((item, index) => (
                <li key={index} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] lg:w-[72px] lg:h-[72px] bg-[#27272c] accent rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl">{item.description}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact
