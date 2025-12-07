"use client"

import { useEffect, useState } from "react"

interface BlogPost {
  id: number
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
}

const POSTS_PER_PAGE = 3

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([])
  const [postsShown, setPostsShown] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadPosts = async () => {
      const response = await fetch("/data/posts.json")
      const data = await response.json()
      const sorted = data.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setAllPosts(sorted)
      displayMorePosts(sorted, 0)
    }

    loadPosts()
  }, [])

  const displayMorePosts = (posts: BlogPost[], currentIndex: number) => {
    const endIndex = currentIndex + POSTS_PER_PAGE
    setDisplayedPosts(posts.slice(0, endIndex))
    setPostsShown(endIndex)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      displayMorePosts(allPosts, 0)
      return
    }

    const lowerQuery = query.toLowerCase()
    const results = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
    setDisplayedPosts(results)
    setPostsShown(results.length)
  }

  const handleLoadMore = () => {
    displayMorePosts(searchQuery.trim() ? displayedPosts : allPosts, postsShown)
  }

  return (
    <main>
      <section className="blog-section">
        <h1>Blog</h1>
        <p className="section-subtitle">Thoughts on design, code, and creativity</p>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Blog Posts */}
        <div className="blog-posts">
          {displayedPosts.length > 0 ? (
            displayedPosts.map((post) => (
              <article
                key={post.id}
                className="blog-post"
                onClick={() => (window.location.href = `/blog/${post.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="blog-post-date">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <h3 className="blog-post-title">{post.title}</h3>
                <p className="blog-post-excerpt">{post.excerpt}</p>
                <div className="blog-post-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "var(--color-text-light)", padding: "2rem" }}>No posts found.</p>
          )}
        </div>

        {/* Load More */}
        {postsShown < (searchQuery.trim() ? displayedPosts.length : allPosts.length) && (
          <div className="pagination">
            <button className="btn btn-secondary" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
