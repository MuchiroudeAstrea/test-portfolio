"use client"

import { useEffect, useState } from "react"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  tech: string[]
  liveLink: string
  repoLink: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([])
  const [selectedTag, setSelectedTag] = useState("all")
  const [allTags, setAllTags] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadProjects = async () => {
      const response = await fetch("/data/projects.json")
      const data = await response.json()
      setProjects(data)
      setDisplayedProjects(data)

      const tags = new Set<string>()
      data.forEach((project: Project) => {
        project.tags.forEach((tag: string) => tags.add(tag))
      })
      setAllTags(tags)
    }

    loadProjects()
  }, [])

  const filterByTag = (tag: string) => {
    setSelectedTag(tag)
    if (tag === "all") {
      setDisplayedProjects(projects)
    } else {
      setDisplayedProjects(projects.filter((p) => p.tags.includes(tag)))
    }
  }

  return (
    <main>
      <section className="projects-section">
        <h1>Projects</h1>
        <p className="section-subtitle">A selection of work I'm proud of</p>

        {/* Filter Tags */}
        <div className="filter-tags">
          <button className={`tag-btn ${selectedTag === "all" ? "active" : ""}`} onClick={() => filterByTag("all")}>
            All
          </button>
          {Array.from(allTags).map((tag) => (
            <button
              key={tag}
              className={`tag-btn ${selectedTag === tag ? "active" : ""}`}
              onClick={() => filterByTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {displayedProjects.map((project) => (
            <div key={project.id} className="project-card">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="project-image"
                loading="lazy"
              />
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="tech-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-links live">
                    Live Demo
                  </a>
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-links repo">
                    Repository
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
