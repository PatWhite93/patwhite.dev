---
title: "Agentic Video Editor"
description: "An AI-powered video editing pipeline that watches raw sports footage, identifies the interesting moments, and cuts a highlight reel - no human input required."
tags: ["Python", "AI", "Computer Vision", "LLM"]
image: "/images/projects/agentic-video-editor/thumb.png"
images:
  - "/images/projects/agentic-video-editor/filmstrip-skate2.png"
  - "/images/projects/agentic-video-editor/filmstrip-skate3.png"
  - "/images/projects/agentic-video-editor/filmstrip-ssim-overlay.png"
carouselTitle: "Filmstrip analysis with SSIM overlay"
featured: true
order: 3
---

I film a lot of skateboarding. The problem: a 20-minute session produces maybe 90 seconds of usable footage buried in minutes of pushing, standing around, and failed attempts. Scrubbing through it manually is tedious enough that most clips never get edited at all.

So I built a system that does it for me. Point it at raw footage, and it returns a trimmed highlight reel - tricks identified, timestamps extracted, clips cut. No timeline, no scrubbing, no manual editing.

## The Filmstrip Idea

The core insight: you can compress an entire video into a single image that an LLM can reason about.

The system extracts frames evenly across the video, then calculates SSIM (structural similarity) between consecutive frames to measure motion intensity. These frames and the SSIM signal get composited into a filmstrip - a grid of thumbnails with a red waveform overlay showing how much the scene is changing at each point.

{{carousel}}

The red SSIM waveform is the key signal. Dips in the curve correspond to high frame-to-frame change (motion, tricks), while flat sections indicate stillness (standing around, pushing). Feed this single image to a vision-capable LLM and it can identify where the action is - reading both the visual content of the frames and the motion signal to pinpoint interesting segments.

One image in, JSON timestamps out. The LLM returns start/end times for every action segment it identifies - trick attempts, landings, interesting bail sequences.

## The Trimming Pipeline

Once segments are identified, FFmpeg handles the cutting:

1. **Segment extension** - Each clip gets 2-3 seconds of extra roll-away time appended, so tricks don't cut off abruptly at the landing
2. **Highlight reel** - All segments concatenated into a single video using stream copy (no re-encoding, no quality loss)
3. **Inverse video** - The "everything else" cut, useful for reviewing what the AI skipped and tuning the prompts

The whole process runs in under a minute for a typical session video.

## Sport-Specific Prompting

The LLM prompt is tuned specifically for skateboarding: it knows to look for approach-trick-landing sequences, to include interesting bail attempts, to distinguish technical skating from just cruising, and to aim for 4-8 second clip windows. The prompt hierarchy prioritizes clean landings, then interesting attempts, then any action sequence worth keeping.

Different sport types get different prompts - the system accepts a `--sport` flag that adjusts what constitutes an "interesting moment."

## Mobile App (Sport Clipper)

The CLI works, but the real workflow I wanted was: film on phone, get highlights back on phone. So the pipeline grew a React Native frontend:

- **Proxy compression** - FFmpeg on-device creates a 480p/5fps proxy (~10MB vs ~200MB original). 95% bandwidth reduction
- **Cloud analysis** - Proxy uploads to a FastAPI backend that runs the filmstrip analysis
- **Local trimming** - Timestamps come back as JSON, FFmpeg trims the *original* full-quality video on-device using copy codec (instant, no quality loss)
- **Gallery save** - Clips land in a "Sport Clipper" album on the camera roll

The original video never leaves the device. Only the low-res proxy goes to the cloud. This keeps upload times reasonable and preserves full quality in the output.

## Stack

Python, FFmpeg, OpenAI GPT-4V, Anthropic Claude, React Native (Expo), FastAPI, Zustand

## Status

The CLI pipeline is fully functional and I use it regularly for my skate footage. The mobile app has a complete processing pipeline with auth, usage tracking, and a freemium model stubbed out - currently in the "works on my device" phase of development.
