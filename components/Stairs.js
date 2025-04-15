import { motion, animate } from "framer-motion";

const stairAnimation = {
  initial: { 
    top: "0%",
   },
  animate: {
    top: "100%",
   },
  exit: { 
    top: ["100%", "0%"],
   },
};

const reverseIndex = (index) =>{
  const totalSteps = 6;
  return totalSteps - index - 1;
}

function Stairs() {
  return (
    <>
    {[...Array(6)].map((_, index) => (
      <motion.div
        key={index}
        className={`h-full w-full bg-white relative`}
        variants={stairAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: 'easeInOut', delay: reverseIndex(index) * 0.1 }}
        // style={{ top: `${reverseIndex(index) * 16.6667}%` }} // 100% / 6 = 16.6667%
      />
    ))}
    </>
  )
}

export default Stairs
