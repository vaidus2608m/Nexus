import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogIn, UserPlus, Zap } from 'lucide-react';

export function MainLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Login', path: '/login', icon: LogIn },
    { name: 'Register', path: '/register', icon: UserPlus },
  ];

  return (
    <div className="min-h-screen bg-vexor-bg flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 border-b border-gray-800 bg-vexor-card/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-white">
          <div className="bg-vexor-accent p-1.5 rounded-lg">
            <Zap className="w-5 h-5 text-black" fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-wider font-sans">NEXUS</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 overflow-hidden flex items-center justify-center">
            <span className="text-xs font-medium text-gray-400">G</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-800 bg-[#0d0d0d] hidden md:flex flex-col py-6">
          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-vexor-accent/10 text-vexor-accent' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-vexor-accent' : ''}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="px-8 mt-auto">
            <div className="p-4 rounded-lg bg-gradient-to-br from-vexor-card to-[#1a1a1a] border border-gray-800">
              <p className="text-sm text-gray-300 font-medium mb-2">Vexor Pro</p>
              <p className="text-xs text-gray-500 mb-3">Unlock premium lobbies and 0 ping routing.</p>
              <button className="text-xs font-semibold text-vexor-accent hover:text-white transition-colors">
                Upgrade Now &rarr;
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto relative p-6 md:p-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
