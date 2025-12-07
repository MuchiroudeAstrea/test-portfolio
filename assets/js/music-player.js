// Music Player Component
const musicPlayer = {
  currentTrackIndex: 0,
  isPlaying: false,
  tracks: [
    { name: "Ambient Dreams", artist: "Lo-Fi Studio", duration: 240, file: "/placeholder.svg?height=100&width=100" },
    { name: "Midnight Vibes", artist: "Chill Beats", duration: 180, file: "/placeholder.svg?height=100&width=100" },
    { name: "Sunset Horizon", artist: "Relaxing Tunes", duration: 200, file: "/placeholder.svg?height=100&width=100" },
  ],

  init() {
    this.render()
    this.attachEventListeners()
    this.restoreState()
  },

  render() {
    const container = document.getElementById("playerContainer")
    const track = this.tracks[this.currentTrackIndex]

    container.innerHTML = `
      <div class="music-player">
        <div class="track-info">
          <div class="track-name">${track.name}</div>
          <div class="track-artist">${track.artist}</div>
        </div>
        
        <div class="player-controls">
          <button class="control-btn prev" data-action="prev">⏮</button>
          <button class="control-btn play" data-action="play">▶</button>
          <button class="control-btn next" data-action="next">⏭</button>
        </div>

        <div class="progress-container">
          <span id="currentTime">0:00</span>
          <div class="progress-bar" id="progressBar">
            <div class="progress" id="progress"></div>
          </div>
          <span id="duration">${this.formatTime(track.duration)}</span>
        </div>

        <div class="playlist">
          ${this.tracks
            .map(
              (t, i) => `
            <div class="playlist-item ${i === this.currentTrackIndex ? "active" : ""}" data-index="${i}">
              ${t.name} - ${t.artist}
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `
  },

  attachEventListeners() {
    const container = document.getElementById("playerContainer")

    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("control-btn")) {
        const action = e.target.dataset.action
        if (action === "play") this.togglePlay()
        else if (action === "next") this.nextTrack()
        else if (action === "prev") this.prevTrack()
      }

      if (e.target.classList.contains("playlist-item")) {
        this.currentTrackIndex = Number.parseInt(e.target.dataset.index)
        this.render()
        this.attachEventListeners()
      }
    })

    const progressBar = container.querySelector(".progress-bar")
    if (progressBar) {
      progressBar.addEventListener("click", (e) => {
        const percent = e.offsetX / progressBar.offsetWidth
        // Simulate progress update
        localStorage.setItem(
          "musicProgress",
          JSON.stringify({
            trackIndex: this.currentTrackIndex,
            progress: percent,
          }),
        )
      })
    }
  },

  togglePlay() {
    this.isPlaying = !this.isPlaying
    this.updatePlayButton()
    localStorage.setItem("musicPlaying", this.isPlaying)
  },

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length
    this.isPlaying = true
    this.saveState()
    this.render()
    this.attachEventListeners()
  },

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length
    this.isPlaying = true
    this.saveState()
    this.render()
    this.attachEventListeners()
  },

  updatePlayButton() {
    const container = document.getElementById("playerContainer")
    const playBtn = container.querySelector('[data-action="play"]')
    if (playBtn) {
      playBtn.textContent = this.isPlaying ? "⏸" : "▶"
    }
  },

  saveState() {
    localStorage.setItem("musicTrackIndex", this.currentTrackIndex)
    localStorage.setItem("musicPlaying", this.isPlaying)
  },

  restoreState() {
    const savedTrack = localStorage.getItem("musicTrackIndex")
    const savedPlaying = localStorage.getItem("musicPlaying")

    if (savedTrack) this.currentTrackIndex = Number.parseInt(savedTrack)
    if (savedPlaying) this.isPlaying = JSON.parse(savedPlaying)

    this.updatePlayButton()
  },

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  },
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("playerContainer")) {
    musicPlayer.init()
  }
})
