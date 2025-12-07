"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface BlogPost {
  id: number
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
  content: string
}

function parseMarkdown(markdown: string): string {
  let html = markdown

  // Escape HTML
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // Headers
  html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>")
  html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>")
  html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>")

  // Code blocks
  const codeBlocks: string[] = []
  html = html.replace(/```(.*?)\n([\s\S]*?)```/g, (match, lang, code) => {
    codeBlocks.push(`<pre><code class="language-${lang || "javascript"}">${code.trim()}</code></pre>`)
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`
  })

  // Blockquotes
  html = html.replace(/^> (.*?)$/gm, "<blockquote>$1</blockquote>")

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")

  // Links
  html = html.replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2">$1</a>')

  // Restore code blocks
  codeBlocks.forEach((block, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, block)
  })

  return html
}

export default function BlogPostPage() {
  const params = useParams()
  const postId = Number(params.id)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [htmlContent, setHtmlContent] = useState("")

  useEffect(() => {
    const loadPost = async () => {
      const response = await fetch("/data/posts.json")
      const posts = await response.json()
      const foundPost = posts.find((p: BlogPost) => p.id === postId)

      if (foundPost) {
        setPost(foundPost)
        setHtmlContent(parseMarkdown(foundPost.content))
      }
    }

    loadPost()
  }, [postId])

  if (!post) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    )
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="post-container">
      <article>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>{formattedDate}</span> by <span>{post.author}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
      <a href="/blog" className="back-link">
        ← Back to Blog
      </a>
    </main>
  )
}
