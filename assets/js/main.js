// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

// Load theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
    themeToggle.textContent = "☀️"
  }
}

// Toggle theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode")
  const isDark = document.body.classList.contains("dark-mode")
  localStorage.setItem("theme", isDark ? "dark" : "light")
  themeToggle.textContent = isDark ? "☀️" : "🌙"
})

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close menu when link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", initTheme)
