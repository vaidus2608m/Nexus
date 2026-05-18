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
