// import { useState } from "react";
// import LocationSelector from "../components/LocationSelector";
// import SearchBar from "../components/SearchBar";
// import FrequentlySearched from "../components/FrequentlySearched";
// import ProductCard from "../components/ProductCard";
// import { fetchComparison } from "../api";
// import { ShootingStars } from "../components/ui/shooting-stars";
// import { ContainerImageFlip } from "../components/ui/container-text-flip";
// import LoadingScreen from "../components/ui/loadingScreen";

// export default function Home() {
//   const [pincode, setPincode] = useState("");
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [compare, setCompare] = useState(false);
//   const [error, setError] = useState("");

//   const onSearch = async () => {
//     setError("");

//     if (!pincode || !query) {
//       setError("Please enter both the query and the pincode.");
//       return;
//     }

//     setCompare(true);
//     setLoading(true);

//     try {
//       const data = await fetchComparison(query, pincode);

//       if (!Array.isArray(data)) throw new Error("Invalid response format");

//       setResults(data);
//     } catch (err) {
//       console.error(err);
//       setResults([]);

//       if (err.message.includes("404")) {
//         setError("No products found. (404 Not Found)");
//       } else {
//         setError(
//           `Something went wrong while fetching data.\n• Please enter a more specific or nearby location.\n• Fetching/scraping is performed on your browser, so it may take time and use your processor.\n• Blinkit and Zepto may not be present in all areas.`
//         );
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden bg-[#0f1117]">
//       <ShootingStars className="absolute inset-0 z-0" />

//       <div className="flex flex-col min-h-screen mt-8">
//         <div className="w-full p-4 z-20 relative flex flex-col sm:flex-row justify-center items-center sm:items-end sm:space-x-6 space-y-3 sm:space-y-0">
//           <LocationSelector setPincode={setPincode} />
//           <SearchBar query={query} setQuery={setQuery} onSearch={onSearch} />
//         </div>

//         {/* ✅ Styled error UI */}
//         {error && (
//           <div className="mt-4 flex justify-center px-4 animate-fade-in">
//             <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-300 px-6 py-4 rounded-xl max-w-2xl w-full shadow-lg">
//               <div className="flex items-start space-x-3">
//                 <svg
//                   className="h-6 w-6 text-red-400 mt-1"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728"
//                   />
//                 </svg>
//                 <div className="text-sm whitespace-pre-line">{error}</div>
//               </div>
//             </div>
//           </div>
//         )}

//         {!compare ? (
//           <div className="relative z-10 max-w-4xl mx-auto py-6 flex-1 flex justify-center items-center min-w-full">
//             <div className="mt-[-100px] md:mt-[-100px]">
//               <h1 className="text-6xl md:text-8xl font-extrabold text-[#ffdd00] text-center">
//                 QuickPick
//               </h1>
//               <div className="md:flex md:justify-between mt-4">
//                 <h4 className="text-2xl font-bold text-white mt-3 ml-2 mb-6 text-center">
//                   We find you the best prices across
//                 </h4>
//                 <ContainerImageFlip
//                   images={[
//                     "/logos/instamart.png",
//                     "/logos/zepto.jpeg",
//                     "/logos/Blinkit.svg"
//                   ]}
//                   interval={2500}
//                   imgClassName="h-20 w-20 md:h-16 md:w-16 object-contain rounded-xl"
//                 />
//               </div>
//             </div>
//           </div>
//         ) : loading ? (
//           <LoadingScreen />
//         ) : (
//           <div className="w-full flex justify-center p-4 mt-10">
//             <div className="grid gap-y-10 gap-x-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//               {results.map((item, i) => (
//                 <ProductCard key={i} {...item} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Search, MapPin, ArrowRight, Package } from "lucide-react"
import { ScrapingLoader } from "@/components/scraping-loader"

import ProductCard from "../components/ProductCard"
import { fetchComparison } from "../api"
import LoadingScreen from "../components/ui/loadingScreen"

export default function ComparePage() {
  const [formData, setFormData] = useState({
    product: "",
    location: "",
    pincode: "",
  })
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showScraping, setShowScraping] = useState(false)
  const [error, setError] = useState("")
  const [compare, setCompare] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.product || !formData.location) {
      setError("Please enter both the product and the location.")
      return
    }

    setCompare(true)
    setIsLoading(true)
    setShowScraping(true)

    try {
      const data = await fetchComparison(formData.product, formData.pincode || formData.location)
      if (!Array.isArray(data)) throw new Error("Invalid response format")

      setResults(data)
    } catch (err) {
      console.error(err)
      setResults([])

      if (err.message.includes("404")) {
        setError("No products found. (404 Not Found)")
      } else {
        setError(
          `Something went wrong while fetching data.\n• Please enter a more specific or nearby location.\n• Fetching/scraping is performed on your browser, so it may take time and use your processor.\n• Blinkit and Zepto may not be present in all areas.`
        )
      }
    }

    setIsLoading(false)
    setShowScraping(false)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Let's Find the
            <span className="text-blue-500"> Best Prices</span>
          </h1>
          <p className="text-xl text-gray-400">Tell us what you're looking for and where you are</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 flex justify-center px-4 animate-fade-in">
            <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-300 px-6 py-4 rounded-xl max-w-2xl w-full shadow-lg">
              <div className="flex items-start space-x-3">
                <svg
                  className="h-6 w-6 text-red-400 mt-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728"
                  />
                </svg>
                <div className="text-sm whitespace-pre-line">{error}</div>
              </div>
            </div>
          </div>
        )}

        {!compare ? (
          // ✅ Show Form UI
          <Card className="bg-gray-900 border-gray-800 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-white">Product Details</CardTitle>
              <p className="text-gray-400">Fill in the details to compare prices</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Product Input */}
                <div className="space-y-3">
                  <Label htmlFor="product" className="text-lg font-medium flex items-center text-white">
                    <Package className="w-5 h-5 mr-2 text-blue-500" />
                    What are you looking for?
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                    <Input
                      id="product"
                      placeholder="e.g., Milk, Bread, Eggs, Fruits..."
                      value={formData.product}
                      onChange={(e) => handleInputChange("product", e.target.value)}
                      className="pl-12 h-14 bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-lg text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* Location Inputs */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="location" className="text-lg font-medium flex items-center text-white">
                      <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                      City/Area
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g., Mumbai, Delhi, Bangalore..."
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="h-14 bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-lg text-white placeholder:text-gray-500"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="pincode" className="text-lg font-medium text-white">
                      Pincode (Optional)
                    </Label>
                    <Input
                      id="pincode"
                      placeholder="e.g., 110001"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      className="h-14 bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-blue-500 text-lg text-white placeholder:text-gray-500"
                      maxLength={6}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={!formData.product || !formData.location || isLoading}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium disabled:opacity-50 shadow-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Searching for best prices...
                      </div>
                    ) : (
                      <>
                        Compare Prices Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : isLoading ? (
          // ✅ Loading
          <LoadingScreen />
        ) : (
          // ✅ Show Results
          <div className="w-full flex justify-center p-4 mt-10">
            <div className="grid gap-y-10 gap-x-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {results.map((item, i) => (
                <ProductCard key={i} {...item} />
              ))}
            </div>
          </div>
        )}

        {/* Info Cards */}
        {!compare && (
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-700">
                  <Search className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2 text-white">Smart Search</h3>
                <p className="text-gray-400 text-sm">Our AI finds the exact products across all platforms</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-700">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2 text-white">Location Based</h3>
                <p className="text-gray-400 text-sm">Prices and availability based on your location</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-700">
                  <Package className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2 text-white">Real-time Data</h3>
                <p className="text-gray-400 text-sm">Live prices updated every few minutes</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {showScraping && (
        <ScrapingLoader product={formData.product} location={formData.location} onComplete={() => setShowScraping(false)} />
      )}
    </div>
  )
}

