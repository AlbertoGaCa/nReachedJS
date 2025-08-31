/**
 * @file src/game/Ball.js
 * @description Defines the `Ball` class, which represents the player's ball in the game.
 * It extends Phaser's `Arc` Game Object and includes physics properties for movement and collisions.
 */

import { GameObjects } from 'phaser';

export class Ball extends GameObjects.Arc {
    /**
     * Creates an instance of the Ball.
     * @param {Phaser.Scene} scene - The scene to which this ball belongs.
     * @param {number} x - The x-coordinate of the ball.
     * @param {number} y - The y-coordinate of the ball.
     * @param {number} radius - The radius of the ball.
     */
    constructor(scene, x, y, radius) {
        // Call the super constructor of Phaser.GameObjects.Arc to create the circular shape
        super(scene, x, y, radius, 0, 360, false, 0xADD8E6); // Light blue color for the ball
        
        // Add this Game Object to the scene's display list
        scene.add.existing(this);
        
        // Enable Arcade Physics for this Game Object
        scene.physics.add.existing(this);
        
        // Configure physics properties
        this.body.setCollideWorldBounds(true); // Make the ball collide with the game world boundaries
        this.body.setBounce(1, 1); // Set bounce to 1 for perfect reflection off surfaces
    }
}
