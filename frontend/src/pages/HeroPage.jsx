import { Link } from "react-router-dom";
import Screen from '../components/Screen';
const HeroPage = () => {
  return (
    
    <div className="min-h-screen bg-[#0f1117] text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        🛒 QuickPick
      </h1>
      <p className="text-lg text-gray-400 max-w-xl text-center mb-8">
        Instantly compare grocery prices across Zepto, Swiggy Instamart, and Blinkit.
        Get the best deals delivered fast.
      </p>

      <Link
        to="/compare"
        className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-transform hover:scale-105"
      >
        Compare Now
      </Link>
      {/* <Screen/> */}
    </div>
  );
};

export default HeroPage;
