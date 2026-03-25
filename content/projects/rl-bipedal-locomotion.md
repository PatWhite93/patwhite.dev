---
title: "RL Bipedal Locomotion System"
description: "Reinforcement learning pipeline training a 31-DOF physics-based humanoid to walk using PPO, with 256 parallel environments and real-time training dashboard."
tags: ["RL", "Python", "PyTorch", "Godot", "AI"]
featured: true
order: 0
---

An end-to-end reinforcement learning system that trains a full-body physics-based humanoid (31 degrees of freedom) to walk, run, and eventually fight — with every movement emerging from learned policy + physics simulation, not hand-crafted animation.

## How It Works

Godot 4.5 runs 256 parallel physics simulations while Python/PyTorch trains a dual-network PPO policy (actor + critic). The biped learns through progressive curriculum — belt speed ramps, harness force decay, direction constraints — bridging the gap from standing to walking without scripted motion.

## Technical Highlights

- **31-DOF humanoid rig** — 14 leg joints, 5 torso, 12 arm DOFs. Far more complex than typical RL locomotion benchmarks (most papers use 6-14 DOF)
- **256 parallel training environments** running in-engine at 8x time acceleration, ~640 samples/sec throughput on consumer hardware
- **18-component reward function** balancing velocity tracking, posture, energy efficiency, foot clearance, and gait symmetry — enabling stable high-dimensional control without policy degeneration
- **Curriculum learning** with continuous difficulty ramps rather than discrete stages
- **Real-time monitoring dashboard** — Flask server with live MJPEG video stream from training environments, stats widgets, and direct TensorBoard integration
- **Milestone tracking system** — every training iteration documented with reward changes, observations, and archived TensorBoard data

## Key Discoveries

- Shuffling vs. stepping is a learnable distinction with proper contact-phase reward design
- Identified and fixed multiple reward hacking vulnerabilities (biped learned to fall backward onto its feet and "surf" on contact)
- 256 parallel environments hit the Python/SB3 bottleneck, not Godot physics — room to scale further
- Curriculum learning can bridge normally discrete skill transitions (standing → walking) that would otherwise require imitation learning

## Stack

Godot 4.5, Python 3, PyTorch, Stable Baselines3, Flask, TensorBoard, ONNX

## Status

245M+ training steps across multiple milestones. Stable standing achieved. Treadmill training in progress for emergent stepping. Designed to progress through locomotion → terrain navigation → balance recovery → striking → self-play combat, all on the same rig and policy architecture.
