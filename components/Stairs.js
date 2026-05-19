import { motion } from "framer-motion";
import { stairTransitionTiming, transitionEase } from "@/lib/transitionTiming";

const stairAnimation = {
  initial: { y: "0%" },
  animate: (index) => ({
    y: "100%",
    transition: {
      duration: stairTransitionTiming.panelDuration,
      ease: transitionEase,
      delay: reverseIndex(index) * stairTransitionTiming.stagger,
    },
  }),
  exit: (index) => ({
    y: "0%",
    transition: {
      duration: stairTransitionTiming.panelDuration,
      ease: transitionEase,
      delay: index * stairTransitionTiming.stagger,
    },
  }),
};

const reverseIndex = (index) => {
  return stairTransitionTiming.columns - index - 1;
};

function Stairs() {
  return (
    <>
      {[...Array(stairTransitionTiming.columns)].map((_, index) => (
        <motion.div
          key={index}
          custom={index}
          className="h-full w-full transform-gpu bg-white will-change-transform"
          variants={stairAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        />
      ))}
    </>
  );
}

export default Stairs;
