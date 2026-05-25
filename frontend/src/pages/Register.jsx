import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import API from '../api/axios';

export function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);
    
    try {
      const response = await API.post('/users/register', {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.data?.success) {
        alert("Account Registered!, Welcome To Nexus");
        navigate('/login'); 
      }
    } catch (error) {
      console.log("Registration Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration Failed, Try Again");
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
            <Shield className="w-8 h-8 text-vexor-accent" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Join The Nexus</h1>
          <p className="text-gray-400 text-sm mt-2">Create your account to start playing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Full Name" 
            name="fullName"
            placeholder="e.g., John Doe"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <Input 
            label="Username" 
            name="username"
            placeholder="e.g., NoobSlayer99"
            value={formData.username}
            onChange={handleChange}
          />
          
          <Input 
            label="Email Address" 
            type="email" 
            name="email"
            placeholder="glhf@nexus.gg"
            value={formData.email}
            onChange={handleChange}
          />
          
          <Input 
            label="Password" 
            type="password" 
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          <Input 
            label="Confirm Password" 
            type="password" 
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
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
