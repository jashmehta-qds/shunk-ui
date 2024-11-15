'use client'

import Hero from '@/components/Hero'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Dynamically import ThreeScene to avoid SSR issues with Three.js
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />
})

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col w-full">
      <Navigation />
      
      {/* Background Three.js Scene */}
      <div className="fixed inset-0 -z-10">
        <ThreeScene />
      </div>
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex items-center justify-center"
      >
        <Hero />
      </motion.div>
    </main>
  )
}
