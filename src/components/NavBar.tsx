
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic, Upload, FileText, CheckCircle, User, Home, LogOut, Settings } from 'lucide-react';

const NavBar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphism py-4 px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Mic className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-lg">AudioCollect</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button 
                variant={isActive('/') ? "default" : "ghost"} 
                size="sm" 
                className="button-transition"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/record">
              <Button 
                variant={isActive('/record') ? "default" : "ghost"} 
                size="sm" 
                className="button-transition"
              >
                <Mic className="mr-2 h-4 w-4" />
                Record
              </Button>
            </Link>
            <Link to="/transcribe">
              <Button 
                variant={isActive('/transcribe') ? "default" : "ghost"} 
                size="sm" 
                className="button-transition"
              >
                <FileText className="mr-2 h-4 w-4" />
                Transcribe
              </Button>
            </Link>
            <Link to="/validate">
              <Button 
                variant={isActive('/validate') ? "default" : "ghost"} 
                size="sm" 
                className="button-transition"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Validate
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                variant={isActive('/dashboard') ? "default" : "ghost"} 
                size="sm" 
                className="button-transition"
              >
                <Upload className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/admin/upload">
              <Button 
                variant={isActive('/admin/upload') ? "default" : "ghost"} 
                size="sm" 
                className="button-transition"
              >
                <Settings className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 button-transition"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </Link>
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
