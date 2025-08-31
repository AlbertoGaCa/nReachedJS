/**
 * @file src/game/scenes/MainMenu.js
 * @description The MainMenu Scene displays the game's title and provides a way for the player to start the game.
 */

import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    /**
     * Creates the MainMenu Scene.
     * This method is called once when the scene is created.
     */
    create ()
    {
        // Add the background image to the scene
        this.add.image(512, 384, 'background');

        // Add a text object to instruct the player to click to start the game
        this.add.text(512, 460, 'Click to Start', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
        
        // Emit an event to indicate that the current scene is ready
        EventBus.emit('current-scene-ready', this);

        // Set up an input listener to start the game when the pointer is pressed down
        this.input.on('pointerdown', () => {
            this.changeScene();
        });
    }

    /**
     * Transitions to the Game scene.
     */
    changeScene ()
    {
        this.scene.start('Game');
    }
}
