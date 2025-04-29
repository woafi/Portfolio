"use client"
import CountUp from "react-countup"

const stats = [
    {
        num: 1,
        text: "Years of Experience",
    },
    {
        num: 6,
        text: "Projects Completed",
    },
    {
        num: 10,
        text: "Technologies Learned",
    },
]

function Stats() {
  return (
    <section className="pt-4 pb-12 lg:pt-0 lg:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-6 max-w-[80vw] lg:max-w-none mx-auto">
            {stats.map((item, index) => (
                <div key={index} className="flex-1 flex gap-4 items-center justify-center lg:justify-start">
                    <CountUp 
                        end={item.num} 
                        duration={5} 
                        delay={2} 
                        className="text-4xl lg:text-6xl font-extrabold"
                    />
                    <p className={`${item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"} leading-snug text-white/80`}>
                        {item.text}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Stats