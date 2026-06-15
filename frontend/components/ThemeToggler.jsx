// components/ThemeToggle.jsx
'use client'
import { Sun, Moon } from 'lucide-react'
import useTheme from '../context/ThemeContext'

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className='p-2 rounded-xl border border-slate-200 dark:border-slate-700
                       bg-white dark:bg-slate-800
                       text-txt-imp-1 dark:text-white
                       hover:bg-slate-100 dark:hover:bg-slate-700
                       transition-all duration-200'
        >
            {isDark
                ? <Sun width={18} height={18} />
                : <Moon width={18} height={18} />
            }
        </button>
    )
}