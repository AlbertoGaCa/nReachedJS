/**
 * @file src/game/scenes/Preloader.js
 * @description The Preloader Scene is responsible for loading all the game assets (images, sounds, etc.)
 * before the game starts. It displays a loading bar to show the progress of asset loading.
 */

import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    /**
     * Initializes the Preloader Scene.
     * This method is called once when the scene is created.
     */
    init ()
    {
        // Display the background image loaded in the Boot Scene
        this.add.image(512, 384, 'background');

        // Create a simple progress bar outline
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        // Create the progress bar itself, which will grow as assets load
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        // Listen to the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            // Update the width of the progress bar based on the loading progress
            bar.width = 4 + (460 * progress);

        });
    }

    /**
     * Preloads all game assets.
     * This method is automatically called by Phaser before the scene's create method.
     */
    preload ()
    {
        // Set the base path for all assets to be loaded in this scene
        this.load.setPath('assets');

        // Load game-specific assets
        this.load.image('logo', 'logo.png'); // Example: Load a logo image
        this.load.image('star', 'star.png'); // Example: Load a star image (used for coins)

        // Generate a 1x1 white pixel texture, useful for creating colored rectangles or simple shapes
        const graphics = this.make.graphics().fillStyle(0xffffff).fillRect(0, 0, 1, 1);
        graphics.generateTexture('whitePixel', 1, 1);
        graphics.destroy(); // Destroy the graphics object as the texture has been generated
    }

    /**
     * Creates the Preloader Scene.
     * This method is automatically called by Phaser once all assets in preload have been loaded.
     */
    create ()
    {
        // After all assets are loaded, transition to the MainMenu scene.
        // Global objects or animations can also be defined here if needed across multiple scenes.
        this.scene.start('MainMenu');
    }
}
