# BBTAN Clone Development with Gemini

This document tracks the development of a BBTAN clone using Phaser, with assistance from the Gemini CLI agent.

## Project Goal

The primary goal is to create a functional and playable clone of the game BBTAN.

## Project Stack

*   **Game Engine:** Phaser 3
*   **Framework:** Vue.js 3
*   **Build Tool:** Vite
*   **Language:** JavaScript

## Important Instructions

*   The code must always be commented, so that in future sessions you understand the context of the code.
*   **Commenting Rule:** When creating a new file or modifying an existing one, add comments to the file to provide context and explanation for future sessions.
*   **File Structure and Context Added:** Detailed explanations of the project's file structure and the context of each key file have been added to this document.

## Project File Structure and Context

This section outlines the key files and directories within the project, along with their purpose and context.

*   `src/game/scenes/`: Directory containing all Phaser game scenes. Each file within this directory represents a distinct game state or screen (e.g., Boot, Preloader, Game, MainMenu, GameOver).
*   `src/game/main.js`: The main configuration file for the Phaser game instance. It initializes the Phaser game, defines its dimensions, physics, and registers all the scenes.
*   `src/App.vue`: The main Vue.js component that serves as the entry point for the frontend application. It hosts the Phaser game instance within its template.
*   `src/PhaserGame.vue`: A Vue.js component responsible for embedding and managing the Phaser game instance within the Vue application. It handles the mounting and unmounting of the Phaser game.
*   `src/game/Ball.js`: Defines the `Ball` class, which represents the player's ball in the game. It handles the ball's physics, movement, and interactions.
*   `src/game/Brick.js`: Defines the `Brick` class, representing the destructible blocks in the game. It manages their health, appearance (including special gold bricks), and behavior upon collision.
*   `src/game/Coin.js`: Defines the `Coin` class, representing the collectible gold coins spawned by special bricks. It handles their appearance and collection logic.
*   `src/game/EventBus.js`: A simple event bus implementation used for communication between different parts of the Phaser game (e.g., between bricks and the game scene).
*   `package.json`: Contains metadata about the project, including its dependencies and scripts for development and building.
*   `GEMINI.md`: This file itself, serving as a shared memory and progress tracker for the development sessions with Gemini.
*   `SESSION_SUMMARY.md`: A summary of achievements and bug fixes for each development session.

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
6.  **[COMPLETED] Gold Economy Implementation:**
    *   Implement a gold counter UI.
    *   Implement special gold bricks that spawn coins.
    *   Implement coin items that increment the gold counter on collection.
7.  **[COMPLETED] Brick Spawning Modification:**
    *   Modify brick spawning to introduce gaps in rows based on probability.
8.  **[COMPLETED] Ball Speed Modification:**
    *   Increase initial ball launch speed.
    *   Implement gradual ball speed increase over time.
9.  **[COMPLETED] Scoring System Implementation:**
    *   Add score value to bricks based on health.
    *   Separate score and turn display in the UI.

## Bug Fixing and Polishing

*   Fixed several bugs related to physics, game state, and user input.
*   Refined the trajectory line and ball shooting mechanics.

---

I will keep this file updated as we make progress on the project.