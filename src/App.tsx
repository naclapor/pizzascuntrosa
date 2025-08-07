import React from 'react';
import { ExternalLink, Play } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-yellow-600 flex items-center justify-center overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-white rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="text-center z-10 px-4 max-w-4xl mx-auto">
        {/* Game Title */}
        <h1 className="text-6xl md:text-8xl font-black mb-4 drop-shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <span className="text-white">PIZZA</span>
          <span className="block text-red-500 animate-pulse">SCUNTROSA</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-12 font-medium drop-shadow-lg">
          La pizza avrà la sua vendetta
        </p>

        {/* Pizza Slice */}
        <div className="relative mb-16 flex justify-center">
          <div className="pizza-slice-container">
            <div className="pizza-slice"></div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-6">
          <button 
            onClick={() => window.open('https://itch.io', '_blank')}
            className="group bg-white text-red-600 px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl hover:bg-yellow-100 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 flex items-center gap-3 mx-auto"
          >
            <Play className="w-6 h-6 group-hover:animate-bounce" />
            PLAY ON ITCH.IO
            <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </button>
          
          <p className="text-white/80 text-sm mt-8">
            © 2025 Pizza Scuntrosa. All rights reserved.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-red-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-orange-300 rounded-full animate-bounce delay-1000"></div>
      </div>

      <style jsx>{`
        .pizza-slice-container {
          perspective: 1000px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pizza-slice {
          width: 0;
          height: 0;
          border-left: 100px solid transparent;
          border-right: 100px solid transparent;
          border-bottom: 150px solid #D2691E;
          position: relative;
          animation: spinSlice 4s infinite linear;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
        }

        .pizza-slice::before {
          content: '';
          position: absolute;
          top: 120px;
          left: -80px;
          width: 160px;
          height: 20px;
          background: #8B4513;
          border-radius: 10px;
          transform: perspective(100px) rotateX(45deg);
        }

        .pizza-slice::after {
          content: '';
          position: absolute;
          top: 30px;
          left: -60px;
          width: 15px;
          height: 15px;
          background: #8B0000;
          border-radius: 50%;
          box-shadow: 
            30px 20px 0 #8B0000,
            -20px 40px 0 #228B22,
            40px 50px 0 #228B22,
            10px 60px 0 #A0522D,
            50px 30px 0 #A0522D;
        }

        @keyframes spinSlice {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
          40%, 43% { transform: translate3d(0, -8px, 0); }
          70% { transform: translate3d(0, -4px, 0); }
          90% { transform: translate3d(0, -2px, 0); }
        }
      `}</style>
    </div>
  );
}

export default App;