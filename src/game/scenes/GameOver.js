/**
 * @file src/game/scenes/GameOver.js
 * @description The GameOver Scene is displayed when the game ends.
 * It shows a 'Game Over' message and allows the player to restart the game.
 */

import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    /**
     * Creates the GameOver Scene.
     * This method is called once when the scene is created.
     */
    create ()
    {
        // Set the background color of the camera to red to indicate game over
        this.cameras.main.setBackgroundColor(0xff0000);

        // Add a background image with some transparency
        this.add.image(512, 384, 'background').setAlpha(0.5);

        // Add the 'Game Over' text and restart instruction
        this.add.text(512, 384, 'Game Over\n\nClick to Restart', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Emit an event to indicate that the current scene is ready
        EventBus.emit('current-scene-ready', this);

        // Set up an input listener to restart the game when the pointer is pressed down
        this.input.on('pointerdown', () => {
            this.changeScene();
        });
    }

    /**
     * Transitions to the MainMenu scene to restart the game.
     */
    changeScene ()
    {
        this.scene.start('MainMenu');
    }
}
