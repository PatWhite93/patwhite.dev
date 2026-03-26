---
title: "Monopoly Deal App"
description: "A full implementation of the Monopoly Deal card game as a real-time multiplayer mobile app - complete rule enforcement, drag-and-drop gameplay, and Firebase-powered multiplayer."
tags: ["React Native", "Firebase", "TypeScript", "Game Dev"]
image: "/images/projects/monopoly-deal/monopoly-deal.png"
featured: true
order: 2
---

<img src="/images/projects/monopoly-deal/gamescreen1.png" alt="Game screen" class="portrait float-right" />

My wife and I are huge Monopoly Deal fans. We wanted to play remotely, and nothing on the app store did the game justice - so I built our own.

Turns out, faithfully implementing a card game is a surprisingly deep engineering problem. Monopoly Deal has deceptively complex rules - 25+ distinct card types, chain reactions, multi-player payment flows, and edge cases that only surface 50 games in.

> **NOTE: Not publicly available.** Hasbro licenses their IP at rates that don't exactly accommodate passion projects. This one lives on our devices and nowhere else.

## The Game

Monopoly Deal is a fast-paced card game where players race to collect 3 complete property sets. On each turn you draw cards, play up to 3 (properties, money, or action cards), and try to out-maneuver your opponents with rent charges, property steals, and the infamous "Just Say No" counter chain.

Every card type is fully implemented:

- **Rent cards** with color selection and building multipliers (houses +3M, hotels +7M)
- **Double the Rent** stacking - up to 2 doubles for a 4x multiplier
- **Sly Deal / Deal Breaker / Forced Deal** - property theft and swaps with full validation
- **Just Say No** - counter-chains with unlimited depth (JSN a JSN that JSN'd your rent)
- **Houses and Hotels** on completed sets
- **Wild properties** that can slot into any matching color group

## Architecture

The real challenge was state management. A single card play can trigger a cascade: play a rent card, opponent plays Just Say No, you counter with your own JSN, rent goes through, opponent selects cards to pay, payment resolves, properties transfer if overpayment includes them.

The solution was a **command pattern** - 20+ atomic command classes that each handle one state mutation. Property transfers, payments, building placements, forced deals - each is a self-contained operation that can be validated, executed, and synchronized across devices.

Key architectural decisions:

- **Pure game logic layer** - rules and state live in `/game`, completely independent from React Native UI
- **Modular card handlers** - registry pattern maps each card type to its behavior, making new cards easy to add
- **Smart auto-pay** - algorithm that selects optimal cards to minimize overpayment when a timer runs out
- **Payment flow manager** - orchestrates multi-step payment sequences with grace period timers (20s rent, 15s debt, 10s birthday)

## Multiplayer

Real-time multiplayer runs on Firebase Firestore with optimistic UI updates. Games support 2-5 players with public, private, or friends-only lobbies and an invite code system for quick joins.

<img src="/images/projects/monopoly-deal/lobby.png" alt="Game lobby" class="portrait" />

*The lobby - browse open games, create your own, or join via invite code.*

The hardest multiplayer problem was payment resolution across devices. When you charge rent to 3 opponents simultaneously, each one gets a countdown timer to select their payment. The server coordinates all three responses, handles auto-pay fallbacks, and resolves the turn atomically.

<img src="/images/projects/monopoly-deal/gamescreen2.png" alt="Game in progress" class="portrait" />

## Stack

React Native (Expo), TypeScript, Firebase (Firestore + Auth), React Native Reanimated, React Native Gesture Handler

## Status

Core gameplay is fully functional with complete rule enforcement. Currently polishing multiplayer edge cases and building out the friends system. It'll never hit the app store, but it doesn't need to - it was built for an audience of two.
