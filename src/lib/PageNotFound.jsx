import { useLocation } from "react-router-dom";

export default function PageNotFound() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden px-6">

      {/* animated background circles */}
      <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-orange-400/20 blur-[100px] rounded-full bottom-[-120px] right-[-120px] animate-pulse"></div>

      {/* grid background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* main container */}
      <div className="relative text-center max-w-xl">

        {/* 404 text with glitch effect */}
        <h1 className="relative text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-lg">
          <span className="relative z-10">404</span>
          <span className="absolute top-0 left-0 w-full h-full text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-lg animate-glitch1">404</span>
          <span className="absolute top-0 left-0 w-full h-full text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-lg animate-glitch2">404</span>
        </h1>

        {/* title */}
        <h2 className="text-3xl font-bold text-white mt-2">
          الصفحة غير موجودة
        </h2>

        {/* description */}
        <p className="text-slate-400 mt-4 leading-relaxed">
          يبدو أنك حاولت الوصول إلى صفحة غير موجودة في الموقع.
        </p>

        <p className="text-slate-500 text-sm mt-2">
          {location.pathname}
        </p>

        {/* buttons */}
        <div className="flex justify-center gap-4 mt-10">

          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 text-white font-semibold transition-all duration-200"
          >
            العودة للرئيسية
          </button>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200"
          >
            رجوع
          </button>

        </div>
        <p className="text-xs text-slate-500 mt-10">
          Created by Abdulrahman Elqllawy
        </p>
      </div>
      


      {/* <style>{`
        @keyframes glitch1 {
          0% { transform: translate(2px, -2px); opacity: 0.8; }
          20% { transform: translate(-2px, 2px); opacity: 0.6; }
          40% { transform: translate(2px, 2px); opacity: 0.7; }
          60% { transform: translate(-2px, -2px); opacity: 0.8; }
          80% { transform: translate(2px, 0px); opacity: 0.6; }
          100% { transform: translate(0, 0); opacity: 0.8; }
        }

        @keyframes glitch2 {
          0% { transform: translate(-2px, 2px); opacity: 0.6; }
          20% { transform: translate(2px, -2px); opacity: 0.8; }
          40% { transform: translate(-2px, -2px); opacity: 0.7; }
          60% { transform: translate(2px, 2px); opacity: 0.6; }
          80% { transform: translate(-2px, 0px); opacity: 0.8; }
          100% { transform: translate(0, 0); opacity: 0.7; }
        }

        .animate-glitch1 {
          animation: glitch1 1s infinite linear alternate-reverse;
          clip-path: inset(0 0 50% 0);
        }

        .animate-glitch2 {
          animation: glitch2 1s infinite linear alternate-reverse;
          clip-path: inset(50% 0 0 0);
        }
      `}</style> */}
      
    </div>

  );
}

// export default function PageNotFound() {
//   return (
//     <div style={{textAlign:"center", marginTop:"100px"}}>
//       <h1>404</h1>
//       <p>page not found</p>
//     </div>
//   )
// }