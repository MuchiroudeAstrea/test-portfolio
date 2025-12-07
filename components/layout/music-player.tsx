"use client"

import { useEffect, useState } from "react"

interface Track {
  name: string
  artist: string
  duration: number
  file: string
}

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    const defaultTracks = [
      { name: "Ambient Dreams", artist: "Lo-Fi Studio", duration: 240, file: "/placeholder.svg?height=100&width=100" },
      { name: "Midnight Vibes", artist: "Chill Beats", duration: 180, file: "/placeholder.svg?height=100&width=100" },
      {
        name: "Sunset Horizon",
        artist: "Relaxing Tunes",
        duration: 200,
        file: "/placeholder.svg?height=100&width=100",
      },
    ]
    setTracks(defaultTracks)

    const savedTrack = localStorage.getItem("musicTrackIndex")
    const savedPlaying = localStorage.getItem("musicPlaying")
    if (savedTrack) setCurrentTrackIndex(Number(savedTrack))
    if (savedPlaying) setIsPlaying(JSON.parse(savedPlaying))
  }, [])

  const currentTrack = tracks[currentTrackIndex]

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
    localStorage.setItem("musicPlaying", JSON.stringify(!isPlaying))
  }

  const handleNext = () => {
    const newIndex = (currentTrackIndex + 1) % tracks.length
    setCurrentTrackIndex(newIndex)
    setIsPlaying(true)
    localStorage.setItem("musicTrackIndex", newIndex.toString())
  }

  const handlePrev = () => {
    const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length
    setCurrentTrackIndex(newIndex)
    setIsPlaying(true)
    localStorage.setItem("musicTrackIndex", newIndex.toString())
  }

  const handleSelectTrack = (index: number) => {
    setCurrentTrackIndex(index)
    setIsPlaying(true)
    localStorage.setItem("musicTrackIndex", index.toString())
  }

  if (!currentTrack) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="music-player">
      <div className="track-info">
        <div className="track-name">{currentTrack.name}</div>
        <div className="track-artist">{currentTrack.artist}</div>
      </div>

      <div className="player-controls">
        <button className="control-btn prev" onClick={handlePrev}>
          ⏮
        </button>
        <button className="control-btn play" onClick={handlePlay}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="control-btn next" onClick={handleNext}>
          ⏭
        </button>
      </div>

      <div className="progress-container">
        <span id="currentTime">0:00</span>
        <div className="progress-bar" id="progressBar">
          <div className="progress" id="progress"></div>
        </div>
        <span id="duration">{formatTime(currentTrack.duration)}</span>
      </div>

      <div className="playlist">
        {tracks.map((track, index) => (
          <div
            key={index}
            className={`playlist-item ${index === currentTrackIndex ? "active" : ""}`}
            onClick={() => handleSelectTrack(index)}
          >
            {track.name} - {track.artist}
          </div>
        ))}
      </div>
    </div>
  )
}
