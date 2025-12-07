export const metadata = {
  title: "My Portfolio",
  description: "Portfolio and blog of a creative developer. View projects, read blog posts, and connect.",
  openGraph: {
    title: "My Portfolio",
    description: "Portfolio and blog of a creative developer.",
    type: "website",
    url: "https://yourportfolio.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio",
    description: "Portfolio and blog of a creative developer.",
  },
}

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <img src="/placeholder.svg?height=160&width=160" alt="Profile avatar" className="avatar" />
          <h1 className="hero-title">Hi, I'm Alex</h1>
          <p className="hero-subtitle">Creative Developer & Designer</p>
          <p className="hero-bio">
            I craft beautiful, interactive experiences on the web. Exploring the intersection of design and code.
          </p>
          <div className="hero-ctas">
            <a href="/projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="/blog" className="btn btn-secondary">
              Read Blog
            </a>
          </div>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              𝕏
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              ◉
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              in
            </a>
            <a href="mailto:hello@example.com" aria-label="Email">
              ✉
            </a>
          </div>
        </div>
      </section>

      {/* Music Player Preview */}
      <section id="music-player" className="music-section">
        <h2>Now Playing</h2>
        <div id="playerContainer" className="music-player-wrapper"></div>
      </section>
    </main>
  )
}
