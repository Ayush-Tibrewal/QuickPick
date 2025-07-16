import { useState } from "react";
import LocationSelector from "../components/LocationSelector";
import SearchBar from "../components/SearchBar";
import FrequentlySearched from "../components/FrequentlySearched";
import ProductCard from "../components/ProductCard";
import { fetchComparison } from "../api";
import { ShootingStars } from "../components/ui/shooting-stars";
import { ContainerImageFlip } from "../components/ui/container-text-flip";
import LoadingScreen from "../components/ui/loadingScreen";

export default function Home() {
  const [pincode, setPincode] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [compare, setCompare] = useState(false);
  const [error, setError] = useState("");

  const onSearch = async () => {
    setError("");

    if (!pincode || !query) {
      setError("Please enter both the query and the pincode.");
      return;
    }

    setCompare(true);
    setLoading(true);

    try {
      const data = await fetchComparison(query, pincode);

      if (!Array.isArray(data)) throw new Error("Invalid response format");

      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);

      if (err.message.includes("404")) {
        setError("No products found. (404 Not Found)");
      } else {
        setError(
          `Something went wrong while fetching data.\n• Please enter a more specific or nearby location.\n• Fetching/scraping is performed on your browser, so it may take time and use your processor.\n• Blinkit and Zepto may not be present in all areas.`
        );
      }
    }

    setLoading(false);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0f1117]">
      <ShootingStars className="absolute inset-0 z-0" />

      <div className="flex flex-col min-h-screen mt-8">
        <div className="w-full p-4 z-20 relative flex flex-col sm:flex-row justify-center items-center sm:items-end sm:space-x-6 space-y-3 sm:space-y-0">
          <LocationSelector setPincode={setPincode} />
          <SearchBar query={query} setQuery={setQuery} onSearch={onSearch} />
        </div>

        {/* ✅ Styled error UI */}
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
          <div className="relative z-10 max-w-4xl mx-auto py-6 flex-1 flex justify-center items-center min-w-full">
            <div className="mt-[-100px] md:mt-[-100px]">
              <h1 className="text-6xl md:text-8xl font-extrabold text-[#ffdd00] text-center">
                QuickPick
              </h1>
              <div className="md:flex md:justify-between mt-4">
                <h4 className="text-2xl font-bold text-white mt-3 ml-2 mb-6 text-center">
                  We find you the best prices across
                </h4>
                <ContainerImageFlip
                  images={[
                    "/logos/instamart.png",
                    "/logos/zepto.jpeg",
                    "/logos/Blinkit.svg"
                  ]}
                  interval={2500}
                  imgClassName="h-20 w-20 md:h-16 md:w-16 object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        ) : loading ? (
          <LoadingScreen />
        ) : (
          <div className="w-full flex justify-center p-4 mt-10">
            <div className="grid gap-y-10 gap-x-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {results.map((item, i) => (
                <ProductCard key={i} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
