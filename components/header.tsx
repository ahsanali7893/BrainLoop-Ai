"use client";

// "use client";

import { Bot, Sun, Moon, Menu, Settings, User, LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import ModelSelector from "./model-selector";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const { user, signOut } = useAuth();
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      // console.log(data.user?.user_metadata);
    });
  }, []);

  // Get full name and avatar from user_metadata if available
  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.user_metadata?.email || "User";
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300 w-full">
      <div className="max-w-full mx-auto flex sm:flex-row h- sm:h-16 items-center justify-between px-2 sm:px-4 py-2 sm:py-0 gap-2 sm:gap-0 overflow-visible w-full">
        {/* Left: Logo and title */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify sm:justify-start min-w-0">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 shadow-md flex-shrink-0">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-sans tracking-tight text-primary drop-shadow-sm whitespace-nowrap truncate max-w-[120px] sm:max-w-none">
            BrainLoop AI
          </h1>
        </div>
        {/* Center: Model Selector (hidden on mobile) */}
        <div className="hidden sm:flex items-center min-w-[180px] relative z-50 gap-2">
          {/* <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            disabled={false}
          /> */}
        </div>
        {/* Right: User, theme, menu */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          {/* Desktop user info */}
          {user ? (
            <>
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Link
                  href="/profile"
                  className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
                  aria-label="Profile Settings"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="h-7 w-7 rounded-full border shadow object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="font-semibold text-gray-900 dark:text-gray-100 max-w-[100px] truncate">{fullName}</span>
                </Link>
              </div>
              <button
                onClick={handleSignOut}
                className="hidden md:inline rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="hidden md:inline rounded-md px-3 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Sign In
            </Link>
          )}
          {/* Theme toggle always visible */}
          <button
            onClick={toggleTheme}
            className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          {/* Mobile menu button */}
          <button
            className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground sm:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <span className="sr-only">Close menu</span> : <span className="sr-only">Open menu</span>}
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {/* Mobile dropdown menu */}
      <div
        className={`sm:hidden transition-all duration-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b ${menuOpen ? 'max-h-40 py-2 opacity-100' : 'max-h-0 py-0 opacity-0'} overflow-hidden w-full`}
      >
        <div className="flex flex-col items-stretch px-4 gap-2">
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                aria-label="Profile Settings"
                onClick={() => setMenuOpen(false)}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="h-7 w-7 rounded-full border shadow object-cover"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[120px]">{fullName}</span>
              </Link>
              <button
                onClick={() => { handleSignOut(); setMenuOpen(false); }}
                className="flex items-center gap-2 rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4 mr-1" /> Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-md px-3 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
