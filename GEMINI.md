# BBTAN Clone Development with Gemini

This document tracks the development of a BBTAN clone using Phaser, with assistance from the Gemini CLI agent.

## Project Goal

The primary goal is to create a functional and playable clone of the game BBTAN.

## Project Stack

*   **Game Engine:** Phaser 3
*   **Framework:** Vue.js 3
*   **Build Tool:** Vite
*   **Language:** JavaScript

## Key Files

*   `src/game/scenes/`: Directory containing all Phaser game scenes.
*   `src/game/main.js`: Main configuration file for the Phaser game.
*   `src/App.vue`: The main Vue component, which hosts the Phaser game.
*   `package.json`: Project dependencies and scripts.
*   `GEMINI.md`: This file, serving as our shared memory and progress tracker.

## Development Plan

This is a tentative plan that we can adjust as we go.

1.  **[COMPLETED] Setup & Cleanup:** Clean up the existing template scenes and UI elements that are not needed for our BBTAN clone.
2.  **[COMPLETED] Ball Implementation:**
    *   Create a `Ball` class.
    *   Implement ball shooting mechanics based on user input (mouse/touch).
    *   Implement ball movement and bouncing off walls.
3.  **[COMPLETED] Brick Implementation:**
    *   Create a `Brick` class.
    *   Implement a system for spawning rows of bricks.
    *   Add a counter to each brick that decreases on collision with a ball.
4.  **[COMPLETED] Game Logic:**
    *   Implement the main game loop.
    *   Manage turns, ball collection, and brick spawning.
    *   Implement game over conditions.
5.  **[COMPLETED] UI & Polish:**
    *   Add a score display.
    *   Add a game over screen with a restart option.
    *   Incorporate sound effects and visual polish.

## Bug Fixing and Polishing

*   Fixed several bugs related to physics, game state, and user input.
*   Refined the trajectory line and ball shooting mechanics.

---

I will keep this file updated as we make progress on the project.
