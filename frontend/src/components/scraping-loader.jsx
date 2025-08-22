"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  Search,
  Zap,
  TrendingDown,
  ShoppingCart,
  Timer,
  Star,
  Wifi,
  Database,
  Globe,
  Activity,
} from "lucide-react"

export function ScrapingLoader({ product, location, onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)
  const [steps, setSteps] = useState([
    {
      platform: "Zepto",
      status: "pending",
      color: "bg-gray-800 text-purple-400 border-gray-700",
      icon: "Z",
      message: "Initializing connection...",
      progress: 0,
      itemsFound: 0,
      avgPrice: "₹0",
    },
    {
      platform: "Blinkit",
      status: "pending",
      color: "bg-gray-800 text-yellow-400 border-gray-700",
      icon: "B",
      message: "Waiting in queue...",
      progress: 0,
      itemsFound: 0,
      avgPrice: "₹0",
    },
    {
      platform: "Swiggy Instamart",
      status: "pending",
      color: "bg-gray-800 text-orange-400 border-gray-700",
      icon: "S",
      message: "Preparing scraper...",
      progress: 0,
      itemsFound: 0,
      avgPrice: "₹0",
    }
  ])

  const phases = [
    "🔍 Initializing Smart Search",
    "🌐 Connecting to Platforms",
    "⚡ Scraping Real-time Data",
    "📊 Processing Price Information",
    "💰 Calculating Best Deals",
    "🎯 Finalizing Results",
  ]

  const tips = [
    {
      icon: <TrendingDown className="w-5 h-5 text-green-400" />,
      title: "Price Tracking",
      description: "We track price changes every 5 minutes to ensure you get the most current deals.",
    },
    {
      icon: <Timer className="w-5 h-5 text-blue-400" />,
      title: "Delivery Speed",
      description: "Quick Pick compares not just prices, but also delivery times to find your perfect match.",
    },
    {
      icon: <Star className="w-5 h-5 text-yellow-400" />,
      title: "Quality Ratings",
      description: "We factor in customer ratings and reviews to recommend the best overall value.",
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-purple-400" />,
      title: "Smart Bundling",
      description: "Our AI suggests complementary items that could save you on delivery fees.",
    },
    {
      icon: <Zap className="w-5 h-5 text-orange-400" />,
      title: "Flash Deals",
      description: "We automatically detect limited-time offers and flash sales across platforms.",
    },
  ]

  const [currentTip, setCurrentTip] = useState(0)
  const [stats, setStats] = useState([
    { label: "Items Scanned", value: "0", change: "+0", trend: "up" },
    { label: "Platforms", value: "0/4", change: "Active", trend: "up" },
    { label: "Best Savings", value: "₹0", change: "0%", trend: "down" },
    { label: "Avg. Delivery", value: "-- min", change: "Calculating", trend: "down" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / 500 // 45 seconds = 450 intervals of 100ms

        // Update phase
        const newPhase = Math.floor((newProgress / 100) * phases.length)
        if (newPhase !== phase && newPhase < phases.length) {
          setPhase(newPhase)
        }

        // Update tips every 9 seconds
        const tipIndex = Math.floor((newProgress / 100) * tips.length)
        if (tipIndex !== currentTip && tipIndex < tips.length) {
          setCurrentTip(tipIndex)
        }

        // Update steps based on progress
        setSteps((prevSteps) =>
          prevSteps.map((step, index) => {
            const stepStart = (index / prevSteps.length) * 100
            const stepEnd = ((index + 1) / prevSteps.length) * 100
            const stepProgressPercent = Math.max(
              0,
              Math.min(100, ((newProgress - stepStart) / (stepEnd - stepStart)) * 100),
            )

            let status = "pending"
            let message = step.message
            let itemsFound = 0
            let avgPrice = "₹0"

            if (newProgress >= stepStart) {
              if (stepProgressPercent < 20) {
                status = "connecting"
                message = "Establishing secure connection..."
              } else if (stepProgressPercent < 80) {
                status = "scraping"
                message = "Scanning products and prices..."
                itemsFound = Math.floor((stepProgressPercent / 100) * 25)
                avgPrice = `₹${Math.floor(Math.random() * 200 + 50)}`
              } else if (stepProgressPercent < 100) {
                status = "processing"
                message = "Validating data quality..."
                itemsFound = Math.floor((stepProgressPercent / 100) * 25)
              } else {
                status = "completed"
                message = "✅ Data collection complete"
                itemsFound = 25
              }
            }

            return {
              ...step,
              status,
              message,
              progress: stepProgressPercent,
              itemsFound,
              avgPrice,
            }
          }),
        )

        // Update stats
        const completedSteps = steps.filter((s) => s.status === "completed").length
        const totalItems = steps.reduce((acc, step) => acc + step.itemsFound, 0)
        const avgSavings = Math.floor(Math.random() * 50 + 10)

        setStats([
          {
            label: "Items Scanned",
            value: totalItems.toString(),
            change: `+${Math.floor(newProgress / 2)}`,
            trend: "up",
          },
          { label: "Platforms", value: `${completedSteps}/4`, change: "Active", trend: "up" },
          { label: "Best Savings", value: `₹${avgSavings}`, change: `${Math.floor(avgSavings / 2)}%`, trend: "down" },
          {
            label: "Avg. Delivery",
            value: `${Math.floor(15 - (newProgress / 100) * 5)} min`,
            change: "Optimizing",
            trend: "down",
          },
        ])

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onComplete()
          }, 1000)
          return 100
        }

        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [phase, currentTip, steps, phases.length, tips.length, onComplete])

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden">
      <div className="w-full max-w-6xl mx-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Progress Card */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800 shadow-2xl">
              <CardContent className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-blue-600 rounded-full animate-pulse" />
                    <div className="absolute inset-1 bg-gray-900 rounded-full flex items-center justify-center">
                      <Search className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Finding Best Prices</h2>
                  <p className="text-gray-400 mb-4">
                    Searching for "{product}" in {location}
                  </p>
                  <Badge className="bg-gray-800 text-blue-400 px-4 py-1 border border-gray-700">{phases[phase]}</Badge>
                </div>

                {/* Circular Progress */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-gray-800"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                      className="transition-all duration-300 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">{Math.round(progress)}%</div>
                      <div className="text-sm text-gray-400">Complete</div>
                    </div>
                  </div>
                </div>

                {/* Platform Status */}
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div
                      key={step.platform}
                      className={`relative overflow-hidden rounded-xl border transition-all duration-500 ${
                        step.status === "completed"
                          ? "bg-gray-800 border-green-600/50"
                          : step.status === "scraping" || step.status === "processing"
                            ? "bg-gray-800 border-blue-600/50"
                            : step.status === "connecting"
                              ? "bg-gray-800 border-yellow-600/50"
                              : "bg-gray-900 border-gray-700"
                      }`}
                    >
                      <div className="relative p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center border`}>
                            <span className="font-bold text-sm">{step.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white flex items-center">
                              {step.platform}
                              {step.status === "scraping" && <Activity className="w-4 h-4 ml-2 text-blue-400" />}
                            </h4>
                            <p className="text-sm text-gray-400">{step.message}</p>
                            {step.itemsFound > 0 && (
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-xs text-green-400">{step.itemsFound} items found</span>
                                <span className="text-xs text-blue-400">Avg: {step.avgPrice}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {step.status === "completed" && <CheckCircle className="w-6 h-6 text-green-400" />}
                          {(step.status === "scraping" || step.status === "processing") && (
                            <div className="flex items-center space-x-2">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400" />
                              <span className="text-sm font-medium text-blue-400">{Math.round(step.progress)}%</span>
                            </div>
                          )}
                          {step.status === "connecting" && (
                            <div className="flex items-center space-x-2">
                              <Wifi className="w-5 h-5 text-yellow-400" />
                              <Badge className="bg-gray-800 text-yellow-400 text-xs border border-gray-700">
                                Connecting
                              </Badge>
                            </div>
                          )}
                          {step.status === "pending" && <Clock className="w-5 h-5 text-gray-500" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Real-time Stats */}
            <Card className="bg-gray-900 border-gray-800 shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Database className="w-5 h-5 mr-2 text-blue-400" />
                  Live Statistics
                </h3>
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <p className="text-lg font-semibold text-white">{stat.value}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs ${stat.trend === "up" ? "text-green-400" : "text-blue-400"}`}>
                          {stat.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips & Insights */}
            <Card className="bg-gray-900 border-gray-800 shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-400" />
                  Did You Know?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
                    {tips[currentTip].icon}
                    <div>
                      <h4 className="font-medium text-white mb-1">{tips[currentTip].title}</h4>
                      <p className="text-sm text-gray-400">{tips[currentTip].description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card className="bg-gray-800 border-gray-700 shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">⚡ Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Platforms Monitored</span>
                    <span className="text-white font-medium">50+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Products Tracked</span>
                    <span className="text-white font-medium">1M+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Avg. Savings</span>
                    <span className="text-green-400 font-medium">₹127/order</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Update Frequency</span>
                    <span className="text-blue-400 font-medium">5 mins</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
