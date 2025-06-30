"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

// Utilidad para SSR
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()
    matchMedia.addEventListener("change", handleChange)
    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

// Simula íconos de tecnologías (reemplazá por tus rutas)
const logos = [
  "/logos/JS.svg",
  "/logos/REACT.svg",
  "/logos/NEXT.svg",
  "/logos/Node.svg",
  "/logos/ts.svg",
  "/logos/N8N.svg",
  "/logos/MAKE.svg",

]

const Carousel = memo(
  ({
    cards,
    isCarouselActive,
  }: {
    cards: string[]
    isCarouselActive: boolean
  }) => {
    const isSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isSm ? 800 : 1200
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const controls = useAnimation()
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`logo-${i}`}
              className="absolute flex h-full origin-center items-center justify-center p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 w-[80px] h-[80px] flex items-center justify-center">
                <img
                  src={imgUrl}
                  alt={`logo-${i}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

export function ThreeDLogoCarousel() {
  const [isCarouselActive, setIsCarouselActive] = useState(true)

  const cards = useMemo(() => logos, [])

  useEffect(() => {
    console.log("Loaded logos:", cards)
  }, [cards])

  return (
    <div className="relative h-[300px] w-full overflow-hidden">
      <Carousel cards={cards} isCarouselActive={isCarouselActive} />
    </div>
  )
}
