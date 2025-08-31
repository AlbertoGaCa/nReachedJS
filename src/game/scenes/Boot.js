/**
 * @file src/game/scenes/Boot.js
 * @description The Boot Scene is the first scene to load in the game. Its primary responsibility is to load
 * any assets required by the Preloader Scene (e.g., a loading bar background or logo) and then transition to it.
 */

import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    /**
     * Preloads assets required for the Preloader Scene.
     * This method is automatically called by Phaser before the scene's create method.
     */
    preload ()
    {
        // The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        // The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        // Load the background image. This image will be used in the Preloader scene.
        this.load.image('background', 'assets/bg.png');
    }

    /**
     * Creates the Boot Scene.
     * This method is automatically called by Phaser once all assets in preload have been loaded.
     */
    create ()
    {
        // Start the Preloader scene to load the rest of the game assets.
        this.scene.start('Preloader');
    }
}
