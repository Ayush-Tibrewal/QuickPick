// import { Link } from "react-router-dom";
// import Screen from '../components/Screen';
// const HeroPage = () => {
//   return (
    
//     <div className="min-h-screen bg-[#0f1117] text-white flex flex-col items-center justify-center px-6">
//       <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
//         🛒 QuickPick
//       </h1>
//       <p className="text-lg text-gray-400 max-w-xl text-center mb-8">
//         Instantly compare grocery prices across Zepto, Swiggy Instamart, and Blinkit.
//         Get the best deals delivered fast.
//       </p>

//       <Link
//         to="/compare"
//         className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-transform hover:scale-105"
//       >
//         Compare Now
//       </Link>
//       {/* <Screen/> */}
//     </div>
//   );
// };

// export default HeroPage;

// HeroPage.jsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, MapPin, Search, Target, ArrowRight, Star, Zap, ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"   // ✅ use React Router instead of next/link
// import { Navbar } from "@/components/navbar"

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Compare Prices,
            <span className="text-blue-500"> Save Money</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Get real-time price comparisons from Zepto, Swiggy Instamart, and Blinkit. 
            Find the best deals on groceries and essentials delivered to your doorstep.
          </p>

          {/* Demo Video */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center shadow-2xl border border-gray-800">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
                <p className="text-gray-300 font-medium">Watch How Quick Pick Works</p>
                <p className="text-gray-500 text-sm mt-2">2:30 min demo</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link to="/compare">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto shadow-lg">
              Start Comparing Prices
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-xl text-gray-400">Get the best prices in just 3 simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-700">
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">1. Enter Location</h3>
              <p className="text-gray-400">
                Enter your location or pincode to find available delivery options in your area.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-700">
                <Search className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">2. Search Product</h3>
              <p className="text-gray-400">Search for any grocery item or essential product you want to buy.</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-700">
                <Target className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">3. Compare & Save</h3>
              <p className="text-gray-400">
                Compare prices across platforms and choose the best deal with fastest delivery.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Quick Pick?</h2>
          <p className="text-xl text-gray-400">Save time and money with our smart comparison tool</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2 text-white">Real-time Prices</h3>
            <p className="text-gray-400 text-sm">Live price updates from all platforms</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <ShoppingCart className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2 text-white">Multiple Platforms</h3>
            <p className="text-gray-400 text-sm">Compare across Zepto, Blinkit & more</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <Star className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2 text-white">Best Deals</h3>
            <p className="text-gray-400 text-sm">Always find the lowest prices</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold mb-2 text-white">Fast Delivery</h3>
            <p className="text-gray-400 text-sm">Compare delivery times too</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">Quick Pick</span>
            </div>
            <p className="text-gray-400 mb-6">
              Compare prices, save money, get the best deals delivered fast.
            </p>
            <div className="flex justify-center space-x-6">
              <Link to="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
