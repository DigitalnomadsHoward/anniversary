import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

function TimeSince({ startDate }) {
  const calculateTimePassed = () => {
    const difference = +new Date() - +new Date(startDate)
    const timePassed = {
      years: Math.floor(difference / (1000 * 60 * 60 * 24 * 365)),
      days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 365),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
    return timePassed
  }

  const [timePassed, setTimePassed] = useState(calculateTimePassed())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimePassed(calculateTimePassed())
    }, 1000)

    return () => clearInterval(timer)
  }, [startDate])

  return (
    <div className="text-center space-y-2">
      <div className="text-4xl font-bold text-rose-600">
        {timePassed.years} 年 {timePassed.days} 天
      </div>
      <div className="text-2xl text-pink-500">
        {timePassed.hours} 小时 {timePassed.minutes} 分钟 {timePassed.seconds} 秒
      </div>
    </div>
  )
}

function AnnualMilestones({ startDate }) {
  const calculateYearsPassed = () => {
    const start = new Date(startDate)
    const now = new Date()
    return now.getFullYear() - start.getFullYear()
  }

  const yearsPassed = calculateYearsPassed()

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-center mb-4 text-rose-700">年度纪念</h3>
      <div className="space-y-4">
        {Array.from({ length: yearsPassed }, (_, i) => i + 1).map((year) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: year * 0.1 }}
          >
            <Card className="bg-gradient-to-r from-pink-100 to-rose-100 border-pink-300">
              <CardContent className="p-4">
                <p className="text-lg font-medium text-rose-700">第 {year} 年</p>
                <p className="text-sm text-rose-600">
                  {new Date(startDate).getFullYear() + year} 年 1 月 27 日
                </p>
                <p className="mt-2 text-rose-800">
                  {year === 1 ? "第一个周年，爱情的种子萌芽。" :
                    year === 5 ? "五年里程碑，爱情如酒般醇香。" :
                      year === 10 ? "十年如一日，爱情历久弥新。" :
                        "又一年过去，我们的爱更加深沉。"}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Component() {
  const memorialDate = "2017-01-27"
  const memorialTitle = "纪念 2017 年 1 月 27 日"
  const memorialText = "从那天起，我们的爱情故事就这样开始了..."
  const protagonistName = "刘嘉怡"

  return (
    <div className="min-h-screen py-12 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">
      <motion.h1
        className="text-5xl font-bold text-rose-700 mb-8 p-4 rounded-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {protagonistName}
      </motion.h1>
      <Card className="w-full max-w-3xl bg-white bg-opacity-80 backdrop-blur-sm shadow-lg border-pink-300">
        <CardHeader className="relative">
          <CardTitle className="text-3xl font-bold text-center text-rose-600">
            {memorialTitle}
          </CardTitle>
          <motion.div
            className="absolute -top-4 -left-4 text-pink-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Heart size={32} fill="currentColor" />
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -right-4 text-pink-500"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Heart size={32} fill="currentColor" />
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          <TimeSince startDate={memorialDate} />
          <p className="text-center text-lg text-rose-700">{memorialText}</p>
          <AnnualMilestones startDate={memorialDate} />
        </CardContent>
      </Card>
    </div>
  )
}