import Lottie from 'lottie-react'
import lottieLoader from '../assets/lottieGraduation.json'

const LottieLoading = () => {
  return (
    <Lottie
      loop
      style={{ width: 200, height: 200, margin: 'auto' }}
      animationData={lottieLoader}
      rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
    />
  )
}

export default LottieLoading
