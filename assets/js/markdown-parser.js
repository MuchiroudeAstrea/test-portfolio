// Enhanced markdown to HTML parser
function parseMarkdown(markdown) {
  let html = markdown

  // Escape HTML special characters first
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  // Headers (must be before paragraph conversion)
  html = html.replace(/^### (.*?)$/gm, "<h3>$1</h3>")
  html = html.replace(/^## (.*?)$/gm, "<h2>$1</h2>")
  html = html.replace(/^# (.*?)$/gm, "<h1>$1</h1>")

  // Horizontal rule
  html = html.replace(/^---$/gm, "<hr>")

  // Code blocks (preserve before other formatting)
  const codeBlocks = []
  html = html.replace(/```(.*?)\n([\s\S]*?)```/g, (match, lang, code) => {
    codeBlocks.push(`<pre><code class="language-${lang || "javascript"}">${code.trim()}</code></pre>`)
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`
  })

  // Blockquotes
  html = html.replace(/^> (.*?)$/gm, "<blockquote>$1</blockquote>")

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>")

  // Italic
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>")
  html = html.replace(/_(.*?)_/g, "<em>$1</em>")

  // Links
  html = html.replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // Unordered lists
  const lines = html.split("\n")
  let inList = false
  const processedLines = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const isListItem = /^\* /.test(line)

    if (isListItem && !inList) {
      processedLines.push("<ul>")
      inList = true
    } else if (!isListItem && inList) {
      processedLines.push("</ul>")
      inList = false
    }

    if (isListItem) {
      processedLines.push(`<li>${line.replace(/^\* /, "")}</li>`)
    } else {
      processedLines.push(line)
    }
  }

  if (inList) {
    processedLines.push("</ul>")
  }

  html = processedLines.join("\n")

  // Paragraphs
  html = html
    .split("\n\n")
    .map((para) => {
      para = para.trim()
      if (!para || /^<(h[1-3]|pre|blockquote|ul|ol|li|hr)/.test(para) || para.startsWith("__CODE_BLOCK_")) {
        return para
      }
      return `<p>${para}</p>`
    })
    .join("\n\n")

  // Restore code blocks
  codeBlocks.forEach((block, index) => {
    html = html.replace(`__CODE_BLOCK_${index}__`, block)
  })

  return html
}
