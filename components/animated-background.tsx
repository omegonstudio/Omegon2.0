"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Beam properties
    const beams: Array<{
      x: number
      y: number
      height: number
      opacity: number
      speed: number
      width: number
    }> = []

    // Create beams
    for (let i = 0; i < 8; i++) {
      beams.push({
        x: (window.innerWidth / 9) * (i + 1),
        y: Math.random() * window.innerHeight,
        height: 200 + Math.random() * 400,
        opacity: 0.9 + Math.random() * 0.2,
        speed: 0.5 + Math.random() * 1,
        width: 2 + Math.random() * 4,
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw beams
      beams.forEach((beam) => {
        // Create gradient
        const gradient = ctx.createLinearGradient(0, beam.y, 0, beam.y + beam.height)
        gradient.addColorStop(0, `rgba(237, 242, 82, 0)`)
        gradient.addColorStop(0.5, `rgba(237, 242, 82, ${beam.opacity})`)
        gradient.addColorStop(1, `rgba(237, 242, 82, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(beam.x - beam.width / 2, beam.y, beam.width, beam.height)

        // Update position
        beam.y -= beam.speed
        if (beam.y + beam.height < 0) {
          beam.y = window.innerHeight + Math.random() * 200
          beam.opacity = 0.1 + Math.random() * 0.2
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "transparent" }}
    />
  )
}
