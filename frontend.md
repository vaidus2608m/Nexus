# Frontend Context

## package.json

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^1.16.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-router-dom": "^7.15.1"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@tailwindcss/vite": "^4.3.0",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "postcss": "^8.5.14",
    "tailwindcss": "^4.3.0",
    "vite": "^8.0.12"
  }
}

```

## vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
})

```

## src/index.css

```css
@import "tailwindcss";

@theme {
  --color-vexor-bg: #0a0a0a;
  --color-vexor-card: #141414;
  --color-vexor-accent: #00ff88;
  --color-vexor-accent-hover: #00cc6a;
  --color-vexor-text-muted: #888888;
  
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

@layer base {
  body {
    @apply bg-vexor-bg text-white font-sans antialiased min-h-screen;
  }
}

/* Custom Scrollbar for gamer feel */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #00ff88;
}

```

## src/main.jsx

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

## src/App.jsx

```javascript
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

```

## src/components/Button.jsx

```javascript
import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-vexor-bg";
  
  const variants = {
    primary: "bg-vexor-accent text-black hover:bg-vexor-accent-hover focus:ring-vexor-accent",
    secondary: "bg-vexor-card text-white border border-gray-800 hover:border-vexor-accent hover:text-vexor-accent focus:ring-gray-700",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
    danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 focus:ring-red-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const size = props.size || 'md';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

```

## src/components/Input.jsx

```javascript
import React, { forwardRef } from 'react';

export const Input = forwardRef(({ className = '', label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full bg-[#1a1a1a] border ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-800 focus:border-vexor-accent focus:ring-vexor-accent'
        } rounded-md px-4 py-2.5 text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-1 ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 mt-1">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

```

## src/components/LobbyCard.jsx

```javascript
import React from 'react';
import { Users, Gamepad2, Shield } from 'lucide-react';
import { Button } from './Button';

export function LobbyCard({ lobby }) {
  const { title, game, players, maxPlayers, levelReq, isPrivate } = lobby;
  
  const isFull = players >= maxPlayers;

  return (
    <div className="bg-vexor-card border border-gray-800 rounded-lg p-5 hover:border-vexor-accent/50 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-vexor-accent/5 rounded-full blur-2xl group-hover:bg-vexor-accent/10 transition-colors pointer-events-none" />
      
      <div className="flex justify-between items-start mb-4">
        <div className="bg-black/50 p-2.5 rounded-md border border-gray-800/80 group-hover:border-vexor-accent/30 transition-colors">
          <Gamepad2 className="w-6 h-6 text-vexor-accent" />
        </div>
        {isPrivate && (
          <div className="bg-[#1a1a1a] p-1.5 rounded-md border border-gray-800">
            <Shield className="w-4 h-4 text-yellow-500" />
          </div>
        )}
      </div>

      <div className="mb-6 flex-grow">
        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-vexor-text-muted">{game}</p>
        
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span className={isFull ? 'text-red-400 font-medium' : 'text-gray-300'}>
              {players} / {maxPlayers}
            </span>
          </div>
          {levelReq && (
            <div className="px-2 py-0.5 bg-vexor-accent/10 text-vexor-accent rounded text-xs font-medium border border-vexor-accent/20">
              Lvl {levelReq}+
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-800/50">
        <Button 
          variant={isFull ? 'secondary' : 'primary'} 
          className="w-full"
          disabled={isFull}
        >
          {isFull ? 'Lobby Full' : 'Join Lobby'}
        </Button>
      </div>
    </div>
  );
}

```

## src/components/CreateLobbyModal.jsx

```javascript
import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

export function CreateLobbyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-vexor-card w-full max-w-md rounded-xl border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-800/60 bg-[#111]">
          <h2 className="text-xl font-bold text-white tracking-wide">Create Nexus Lobby</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <Input 
            label="Game Title" 
            placeholder="e.g., CS2, Minecraft, Valorant" 
          />
          <Input 
            label="Lobby Name" 
            placeholder="e.g., Chill Survival, Ranked Grind" 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Region" 
              placeholder="e.g., NA East" 
            />
            <Input 
              label="Level Requirement" 
              placeholder="e.g., 20+" 
              type="number"
            />
          </div>
          
          <div className="pt-4 mt-2 border-t border-gray-800/50 flex justify-end gap-3">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => {
              // Add creation logic later
              onClose();
            }}>
              Launch Lobby
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

```

## src/layouts/MainLayout.jsx

```javascript
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

```

## src/pages/Dashboard.jsx

```javascript
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/Button';
import { LobbyCard } from '../components/LobbyCard';
import { CreateLobbyModal } from '../components/CreateLobbyModal';

const MOCK_LOBBIES = [
  { id: 1, title: 'CS2 Global Elite Grind', game: 'Counter-Strike 2', players: 4, maxPlayers: 5, levelReq: 20, isPrivate: false },
  { id: 2, title: 'Minecraft Chill Survival', game: 'Minecraft', players: 2, maxPlayers: 10, levelReq: null, isPrivate: false },
  { id: 3, title: 'Valorant Radiant Push', game: 'Valorant', players: 5, maxPlayers: 5, levelReq: 50, isPrivate: true },
  { id: 4, title: 'Apex Predator Ranked', game: 'Apex Legends', players: 1, maxPlayers: 3, levelReq: 100, isPrivate: false },
  { id: 5, title: 'GTA V Heist Setup', game: 'Grand Theft Auto V', players: 3, maxPlayers: 4, levelReq: 10, isPrivate: true },
  { id: 6, title: 'Rocket League 2v2s', game: 'Rocket League', players: 1, maxPlayers: 2, levelReq: null, isPrivate: false }
];

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Active Lobbies</h1>
          <p className="text-gray-400">Join a game or create your own instance.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-5 h-5" />
          Create Lobby
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_LOBBIES.map(lobby => (
          <LobbyCard key={lobby.id} lobby={lobby} />
        ))}
      </div>

      <CreateLobbyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

```

## src/pages/Login.jsx

```javascript
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      return;
    }
    setError(false);
    // Add real login logic here later
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-md bg-vexor-card border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-vexor-accent blur-[20px] opacity-30" />
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-vexor-accent/10 p-3 rounded-xl border border-vexor-accent/20 mb-4">
            <Zap className="w-8 h-8 text-vexor-accent" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-2">Enter your credentials to access the Nexus.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="glhf@nexus.gg"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={error && !email ? "Email is required" : null}
          />
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <a href="#" className="text-xs text-vexor-accent hover:text-vexor-accent-hover transition-colors">
                Forgot password?
              </a>
            </div>
            <Input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={error && !password ? "Password is required" : null}
            />
          </div>

          <Button type="submit" className="w-full mt-2" size="lg">
            Initialize Session
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          New to the Nexus?{' '}
          <Link to="/register" className="text-vexor-accent hover:text-white transition-colors font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

```

## src/pages/Register.jsx

```javascript
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Add real registration logic here later
      console.log('Registration attempt:', formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full max-w-md bg-vexor-card border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-vexor-accent blur-[20px] opacity-30" />
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-vexor-accent/10 p-3 rounded-xl border border-vexor-accent/20 mb-4">
            <Shield className="w-8 h-8 text-vexor-accent" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Join The Nexus</h1>
          <p className="text-gray-400 text-sm mt-2">Create your account to start playing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Username" 
            name="username"
            placeholder="e.g., NoobSlayer99"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          
          <Input 
            label="Email Address" 
            type="email" 
            name="email"
            placeholder="glhf@nexus.gg"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          
          <Input 
            label="Password" 
            type="password" 
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Input 
            label="Confirm Password" 
            type="password" 
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <Button type="submit" className="w-full mt-4" size="lg">
            Register Account
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-vexor-accent hover:text-white transition-colors font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

```

