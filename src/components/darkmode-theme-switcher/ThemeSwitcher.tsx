"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, SunIcon } from "lucide-react";
export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <button
      className={`w-fit p-2 rounded-full hover:scale-110 active:scale-100 duration-200 bg-black shadow-red-400 shadow-lg dark:bg-white`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <Moon className="text-white" />
      ) : (
        <SunIcon className="text-black" />
      )}
    </button>
  );
}
