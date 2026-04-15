import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_1.05fr]">
        
        {/* Left Side - Visual / Brand Area */}
        <div className="relative flex items-center justify-center bg-slate-900 p-8 lg:p-16 border-b-2 border-cyan-900/30 lg:border-b-0 lg:border-r-2 lg:border-cyan-500/20">
          <div className="flex flex-col items-center justify-center text-center">
            
            {/* Logo Container */}
            <div className="relative mb-12">
              <div className="h-80 w-80 rounded-3xl border border-cyan-400/20 bg-slate-950/80 flex items-center justify-center overflow-hidden shadow-inner">
                <img 
                  src="/src/assets/images/logo.png" 
                  alt="Centaim Logo" 
                  className="h-56 w-56 object-contain"
                />
              </div>
            </div>

            {/* Brand Text */}
            <div className="space-y-3">
              <h1 className="text-5xl font-bold tracking-tighter text-white">
                Centaim
              </h1>
              <p className="text-xl text-cyan-300/80 font-light">
                Business tools that work together
              </p>
            </div>

            {/* Decorative line */}
            <div className="mt-16 h-px w-40 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          </div>
        </div>

        {/* Right Side - Form Area */}
        <main className="flex items-center justify-center bg-white px-6 py-12 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;