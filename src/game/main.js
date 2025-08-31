/**
 * @file src/game/main.js
 * @description This file configures and initializes the Phaser game instance.
 * It defines the game's dimensions, physics settings, and registers all the scenes used in the game.
 */

import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';

// Phaser game configuration
// For more information, see: https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO, // Use WebGL if available, otherwise Canvas
    width: 1024, // Width of the game canvas
    height: 768, // Height of the game canvas
    parent: 'game-container', // ID of the DOM element to attach the game canvas to
    backgroundColor: '#028af8', // Background color of the game canvas
    physics: {
        default: 'arcade', // Use Arcade Physics system
        arcade: {
            gravity: { y: 0 }, // No gravity in the game
            debug: false // Set to true to show physics bodies for debugging
        }
    },
    scene: [
        Boot, // Initial scene for loading assets and setting up the game
        Preloader, // Scene for preloading game assets
        MainMenu, // Main menu scene
        Game, // Main game scene where gameplay occurs
        GameOver // Game over scene
    ]
};

/**
 * Starts the Phaser game.
 * @param {HTMLElement|string} parent - The DOM element or its ID to attach the game canvas to.
 * @returns {Phaser.Game} The Phaser game instance.
 */
const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });
}

export default StartGame;
