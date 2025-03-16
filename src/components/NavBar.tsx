import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  FileText, 
  CheckCircle, 
  User, 
  Home, 
  LogOut, 
  Menu, 
  X, 
  Upload, 
  BarChart2 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';
import ThemeToggle from '@/components/ThemeToggle';

const NavBar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
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
          
          <div className="flex items-center">
            <ThemeToggle />
            
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menu" className="ml-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80%]">
                  <div className="flex flex-col space-y-4 mt-8">
                    <SheetClose asChild>
                      <Link to="/">
                        <Button 
                          variant={isActive('/') ? "default" : "ghost"} 
                          className="w-full justify-start"
                        >
                          <Home className="mr-2 h-4 w-4" />
                          Home
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/record">
                        <Button 
                          variant={isActive('/record') ? "default" : "ghost"} 
                          className="w-full justify-start"
                        >
                          <Mic className="mr-2 h-4 w-4" />
                          Record
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/transcribe">
                        <Button 
                          variant={isActive('/transcribe') ? "default" : "ghost"} 
                          className="w-full justify-start"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Transcribe
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/validate">
                        <Button 
                          variant={isActive('/validate') ? "default" : "ghost"} 
                          className="w-full justify-start"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Validate
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/dashboard">
                        <Button 
                          variant={isActive('/dashboard') ? "default" : "ghost"} 
                          className="w-full justify-start"
                        >
                          <BarChart2 className="mr-2 h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/profile">
                        <Button 
                          variant={isActive('/profile') ? "default" : "ghost"} 
                          className="w-full justify-start"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/login">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start mt-4"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <nav className="flex items-center space-x-1 ml-4">
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
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button 
                    variant={isActive('/profile') ? "default" : "ghost"} 
                    size="sm" 
                    className="button-transition"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
