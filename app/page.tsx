'use client'

import { IoSparkles } from 'react-icons/io5'
import Image from 'next/image'

const HomePage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden pb-24">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950" />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700/50 backdrop-blur-sm mb-6 animate-fadeIn">
            <IoSparkles className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Customer Loyalty Points App</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 animate-slideUp">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Snapwash
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-8 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Earn points with every wash. <br className="sm:hidden" />
            <span className="text-blue-600 dark:text-cyan-400 font-semibold">Get free washes!</span>
          </p>

          {/* Logo */}
          <div className="relative mx-auto w-fit mb-10 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <Image
              src="/logo.png"
              alt="Snapwash Logo"
              width={288}
              height={288}
              className="w-52 sm:w-64 lg:w-72 h-auto object-contain mx-auto drop-shadow-lg"
              priority
            />
          </div>

        </div>
      </section>
    </div>
  )
}

export default HomePage
