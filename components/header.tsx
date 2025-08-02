"use client";

// "use client";

import { Bot, Sun, Moon, Menu, Settings, User, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import ModelSelector from "./model-selector";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const { user, signOut } = useAuth();
  // Model selector state
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 overflow-visible">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">BrainLoop AI</h1>
        </div>
        {/* Model Selector in header - ensure dropdown is visible */}
        <div className="flex items-center min-w-[180px] relative z-50 gap-2">
          {/* <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            disabled={false}
          /> */}
          {/* <Link
            href="/profile"
            className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
            aria-label="Profile Settings"
          >
            <Settings className="h-5 w-5" />
          </Link> */}
        </div>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Link
                  href="/profile"
                  className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                  aria-label="Profile Settings"
                >
                  <User className="h-4 w-4" />
                </Link>
                <span>{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-md px-3 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Sign In
            </Link>
          )}
          {/* Removed old Setup link */}
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
          <button
            className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
