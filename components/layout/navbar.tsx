"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.toggle("dark")
    setIsDark(isDarkMode)
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
  }

  return (
    <header className="navbar">
      <nav className="nav-container">
        <Link href="/" className="logo">
          Sage
        </Link>

        <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`} id="navMenu">
          <li>
            <Link href="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Projects
            </Link>
          </li>
          <li>
            <Link href="/blog" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Blog
            </Link>
          </li>
          <li>
            <a href="/#music-player" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Music
            </a>
          </li>
        </ul>

        <div className="nav-controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle dark mode">
            {isDark ? "☀️" : "🌙"}
          </button>
          <button
            className="hamburger"
            id="hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  )
}
