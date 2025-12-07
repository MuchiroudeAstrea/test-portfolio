// Blog functionality
let allPosts = []
let displayedPosts = 0
const postsPerPage = 3

async function loadBlogPosts() {
  try {
    const response = await fetch("data/posts.json")
    const posts = await response.json()
    allPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    displayMorePosts()
  } catch (error) {
    console.error("Error loading blog posts:", error)
  }
}

function displayMorePosts() {
  const container = document.getElementById("blogPosts")
  const endIndex = displayedPosts + postsPerPage
  const postsToShow = allPosts.slice(displayedPosts, endIndex)

  postsToShow.forEach((post) => {
    const article = document.createElement("article")
    article.className = "blog-post"
    article.innerHTML = `
      <div class="blog-post-date">${new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
      <h3 class="blog-post-title">${post.title}</h3>
      <p class="blog-post-excerpt">${post.excerpt}</p>
      <div class="blog-post-tags">
        ${post.tags.map((tag) => `<span class="blog-tag">${tag}</span>`).join("")}
      </div>
    `
    article.addEventListener("click", () => {
      window.location.href = `post.html?id=${post.id}`
    })
    container.appendChild(article)
  })

  displayedPosts = endIndex

  // Hide load more if all posts shown
  const loadMoreBtn = document.getElementById("loadMore")
  if (displayedPosts >= allPosts.length) {
    loadMoreBtn.style.display = "none"
  } else {
    loadMoreBtn.style.display = "block"
  }
}

function searchPosts(query) {
  const lowerQuery = query.toLowerCase()
  const results = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )

  const container = document.getElementById("blogPosts")
  container.innerHTML = ""
  displayedPosts = 0

  if (results.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: var(--color-text-light); padding: 2rem;">No posts found.</p>'
    return
  }

  allPosts = results
  displayMorePosts()
}

document.addEventListener("DOMContentLoaded", () => {
  loadBlogPosts()

  // Search functionality
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      if (e.target.value.trim()) {
        searchPosts(e.target.value)
      } else {
        allPosts = []
        displayedPosts = 0
        loadBlogPosts()
      }
    })
  }

  // Load more button
  const loadMoreBtn = document.getElementById("loadMore")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", displayMorePosts)
  }
})
