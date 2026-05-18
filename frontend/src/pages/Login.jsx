import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import API from "../api/axios.js"
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    
    try {
      const response = await API.post('/users/login', {
        email,
        password
      });

      console.log("Response: " + response.data);

      if (response.data.success) {
        alert("Session Initialized!");
        navigate('/'); 
      }
    } catch (error) {
      console.log("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }

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
            error={apiError && !email ? "Email is required" : null}
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
              error={apiError && !email ? "Email is required" : null}
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
