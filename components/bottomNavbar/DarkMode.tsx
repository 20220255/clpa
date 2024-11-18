'use client';

import { MoonIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { BottomNavbarButton, BottomNavBarSpan, LightIcon } from './BottomNavbar.styles';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <BottomNavbarButton type="button" className="dark:hover:bg-slate-800 hover:bg-gray-200 group">
          <LightIcon className="group-hover:text-gray-600 dark:group-hover:text-blue-200 h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
          <BottomNavBarSpan className="dark:text-white group-hover:text-gray-600 dark:group-hover:text-blue-200 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">Theme</BottomNavBarSpan>
          <MoonIcon className='absolute dark:text-blue-200 group-hover:text-gray-600 dark:group-hover:text-blue-200 h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </BottomNavbarButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}