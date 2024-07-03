export const defaultFade = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.08,
      ease: [0, 0, 0.58, 1],
    },
  },
}
export const itemPopUp = {
    initial: { opacity: 0, scale: 0.8, y: 75 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        ease: [0,.47,0,1],
        duration: 1.2,
      },
    },
  }


export const itemSlideDown = {
    initial: { opacity: 0, scale: 0.8, y: -75 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        ease: [0,.47,0,1],
        duration: 1.2,
      },
    },
  }