import React from 'react'
import { motion } from "framer-motion"

interface AnimationSwitchProps {
  isAnimated: boolean;
  setIsAnimated: (val: boolean) => void;
}

export default function AnimationSwitch({isAnimated, setIsAnimated}: AnimationSwitchProps) {
  return (
    <div className='ml-auto flex gap-4'>
      <div className='text-blue-719'>Animation</div>
      <div
        onClick={() => setIsAnimated(!isAnimated)}
        className={`cursor-pointer relative w-10 h-6 bg-blue-bcc rounded-full`}
      >
        <motion.div 
          initial={{ 
            left: "100%",
            translateX: "-100%",
          }}
          animate={{
            left: isAnimated ? "100%" : "0",
            translateX: isAnimated ? "-100%" : "0"
          }}
          className={`
            px-1
            absolute
            top-1/2
          `}
        >
          <div 
            className={`
              ${isAnimated ? "bg-blue-304" : "bg-blue-304/50"}
              w-4 aspect-square 
              rounded-full
              -translate-y-1/2
            `}
          />

        </motion.div>
      </div>
    </div>
  )
}
