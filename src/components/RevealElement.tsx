import { motion, useAnimation, useInView } from 'framer-motion'
import React from 'react'

interface RevealElement {
  children: React.ReactNode
}

const RevealElement: React.FC<RevealElement> = ({ children}) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref)
  const fadeDefault = useAnimation()

  React.useEffect(() => {
    if (isInView) {
      fadeDefault.start('visible')
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 25 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
        },
        exit: {
          opacity: 0,
          y: 25,
        },
      }}
      initial="hidden"
      animate={fadeDefault}
      transition={{ ease: [0, 0.52, 0.16, 1], duration: 1 }}
    >
      {children}
    </motion.div>
  )
}

export default RevealElement
