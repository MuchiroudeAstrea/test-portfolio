// Individual post page functionality
const allPosts = []

// Declare the parseMarkdown function or import it
function parseMarkdown(markdown) {
  // Dummy implementation for illustration purposes
  return markdown.replace(/##\s(.+)/g, "<h2>$1</h2>").replace(/###\s(.+)/g, "<h3>$1</h3>")
}

async function loadPost() {
  const params = new URLSearchParams(window.location.search)
  const postId = Number.parseInt(params.get("id"))

  try {
    const response = await fetch("data/posts.json")
    const posts = await response.json()
    const post = posts.find((p) => p.id === postId)

    if (post) {
      displayPost(post)
    } else {
      document.getElementById("postContent").innerHTML = "<p>Post not found.</p>"
    }
  } catch (error) {
    console.error("Error loading post:", error)
  }
}

function displayPost(post) {
  const container = document.getElementById("postContent")
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const htmlContent = parseMarkdown(post.content)

  container.innerHTML = `
    <h1>${post.title}</h1>
    <div class="post-meta">
      <span>${formattedDate}</span> by <span>${post.author}</span>
    </div>
    ${htmlContent}
  `

  // Update page meta
  document.title = `${post.title} - My Portfolio`
  document.querySelector('meta[name="description"]').setAttribute("content", post.excerpt)
}

document.addEventListener("DOMContentLoaded", loadPost)
