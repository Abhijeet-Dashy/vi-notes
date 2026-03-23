import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/register', formData);
      if (response.data.success) {
        navigate('/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-vibe-card border border-vibe-border rounded-2xl shadow-2xl w-full max-w-[440px] p-8 md:p-10 transition-transform hover:-translate-y-1 duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-white">Create Account</h2>
          <p className="text-vibe-muted text-sm border-b border-vibe-border pb-6">Join us today! Please enter your details.</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input 
            label="Username"
            type="text"
            placeholder="Choose a username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            icon={<User size={18} />}
            required
          />
          <Input 
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            icon={<Mail size={18} />}
            required
          />
          <Input 
            label="Password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            icon={<Lock size={18} />}
            required
            minLength={6}
          />
          <div className="mt-2">
            <Button type="submit" isLoading={isLoading}>
              <UserPlus size={18} className="mr-2" />
              Register
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-vibe-muted">
          <p>Already have an account? <Link to="/login" className="text-vibe-accent hover:text-vibe-accent-hover font-medium transition-colors hover:underline">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};
