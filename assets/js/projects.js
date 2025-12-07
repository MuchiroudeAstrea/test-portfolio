// Projects functionality
let allProjects = []
const filteredProjects = []
let selectedTag = "all"

async function loadProjects() {
  try {
    const response = await fetch("data/projects.json")
    const projects = await response.json()
    allProjects = projects
    displayProjects(allProjects)
    renderFilterTags()
  } catch (error) {
    console.error("Error loading projects:", error)
  }
}

function renderFilterTags() {
  const filterContainer = document.getElementById("filterTags")
  const allTags = new Set()

  allProjects.forEach((project) => {
    project.tags.forEach((tag) => allTags.add(tag))
  })

  // Clear and rebuild
  filterContainer.innerHTML = '<button class="tag-btn active" data-tag="all">All</button>'

  allTags.forEach((tag) => {
    const btn = document.createElement("button")
    btn.className = "tag-btn"
    btn.textContent = tag
    btn.dataset.tag = tag
    btn.addEventListener("click", () => filterByTag(tag, btn))
    filterContainer.appendChild(btn)
  })

  // Re-attach event listener to "All" button
  document.querySelector('[data-tag="all"]').addEventListener("click", () => filterByTag("all", event.target))
}

function filterByTag(tag, button) {
  selectedTag = tag

  // Update active button
  document.querySelectorAll(".tag-btn").forEach((btn) => btn.classList.remove("active"))
  button.classList.add("active")

  // Filter projects
  if (tag === "all") {
    displayProjects(allProjects)
  } else {
    const filtered = allProjects.filter((p) => p.tags.includes(tag))
    displayProjects(filtered)
  }
}

function displayProjects(projects) {
  const grid = document.getElementById("projectsGrid")
  grid.innerHTML = ""

  projects.forEach((project) => {
    const card = document.createElement("div")
    card.className = "project-card"
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="tech-tags">
          ${project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
        </div>
        <div class="project-links">
          <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="project-links live">Live Demo</a>
          <a href="${project.repoLink}" target="_blank" rel="noopener noreferrer" class="project-links repo">Repository</a>
        </div>
      </div>
    `
    grid.appendChild(card)
  })
}

document.addEventListener("DOMContentLoaded", loadProjects)
