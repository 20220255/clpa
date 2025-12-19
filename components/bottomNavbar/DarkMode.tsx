'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ModeToggle() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="group flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-200"
      >
        <div className="relative w-5 h-5" />
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Theme
        </span>
      </button>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="group flex flex-col items-center gap-1 px-5 py-2 rounded-xl transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
        >
          <div className="relative w-5 h-5">
            <SunIcon className="absolute inset-0 text-xl text-slate-500 dark:text-slate-400 group-hover:text-amber-500 h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute inset-0 text-xl text-slate-500 dark:text-slate-400 group-hover:text-blue-400 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors">
            Theme
          </span>
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 rounded-xl shadow-xl">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <SunIcon className="w-4 h-4 mr-2 text-amber-500" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <MoonIcon className="w-4 h-4 mr-2 text-blue-400" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="w-4 h-4 mr-2 text-center">💻</span>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

