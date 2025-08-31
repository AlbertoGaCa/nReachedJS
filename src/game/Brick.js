/**
 * @file src/game/Brick.js
 * @description Defines the `Brick` class, representing the destructible blocks in the game.
 * It manages their health, appearance (including special gold bricks), and behavior upon collision.
 */

import { Physics } from 'phaser';
import { Coin } from './Coin';
import { EventBus } from './EventBus';

export class Brick extends Physics.Arcade.Image {
    /**
     * Creates an instance of a Brick.
     * @param {Phaser.Scene} scene - The scene to which this brick belongs.
     * @param {number} x - The x-coordinate of the brick.
     * @param {number} y - The y-coordinate of the brick.
     * @param {number} width - The width of the brick.
     * @param {number} height - The height of the brick.
     * @param {number} health - The health of the brick (number of hits it can take).
     * @param {boolean} [isGold=false] - True if this is a special gold brick, false otherwise.
     */
    constructor(scene, x, y, width, height, health, isGold = false) {
        // Call the super constructor of Phaser.Physics.Arcade.Image
        super(scene, x, y, 'whitePixel'); // 'whitePixel' is a 1x1 white texture generated in Preloader
        this.setDisplaySize(width, height); // Set the display size of the brick
        this.isGold = isGold; // Store whether this is a gold brick
        this.initialHealth = health; // Store the initial health of the brick to identify its row

        let color;
        if (this.isGold) {
            color = 0xFFD700; // Gold color for special bricks
        } else {
            // Random color for regular bricks
            const colors = [0xff4136, 0x0074d9, 0x2ecc40, 0xb10dc9];
            color = colors[Math.floor(Math.random() * colors.length)];
        }
        this.setTint(color); // Apply the chosen color tint to the brick
        
        // Add this Game Object to the scene's display list and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // `true` makes it a static body (immovable)

        this.health = health; // Set the brick's health
        this.scoreValue = health; // Store initial health as score value
        // Add text to display the brick's health, centered on the brick
        this.text = scene.add.text(x, y, this.health, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    }

    /**
     * Handles a hit on the brick, decreasing its health.
     * If health drops to 0 or below, the brick is destroyed.
     */
    hit() {
        this.health--; // Decrease health
        this.text.setText(this.health); // Update health display
        
        if (this.health <= 0) {
            // If health is zero or less, destroy the brick
            if (this.isGold) {
                // If it's a gold brick, spawn a coin at its position and emit an event
                const coin = new Coin(this.scene, this.x, this.y);
                EventBus.emit('coin-spawned', coin);
            }
            EventBus.emit('brick-destroyed', this.scoreValue); // Emit event with score value
            this.text.destroy(); // Destroy the health text
            this.destroy(); // Destroy the brick object
        }
    }
}
