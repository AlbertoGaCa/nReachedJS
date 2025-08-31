/**
 * @file src/game/Coin.js
 * @description Defines the `Coin` class, representing the collectible gold coins spawned by special bricks.
 * It handles their appearance and collection logic.
 */

import { Physics } from 'phaser';

export class Coin extends Physics.Arcade.Sprite {
    /**
     * Creates an instance of a Coin.
     * @param {Phaser.Scene} scene - The scene to which this coin belongs.
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */
    constructor(scene, x, y) {
        // Call the super constructor of Phaser.Physics.Arcade.Sprite
        super(scene, x, y, 'star'); // 'star' is used as the texture for the coin
        
        // Add this Game Object to the scene's display list and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5); // Set the origin to the center of the sprite
        this.setScale(0.5); // Adjust the scale of the coin sprite
        this.setTint(0xFFD700); // Set the tint to gold color

        // Configure physics properties for overlap (non-colliding)
        this.body.setAllowGravity(false); // Coins are not affected by gravity
        this.body.setCollideWorldBounds(false); // Coins do not collide with world bounds
    }

    /**
     * Handles the collection of the coin.
     * Destroys the coin object from the scene.
     */
    collect() {
        this.destroy(); // Remove the coin from the game
    }
}
