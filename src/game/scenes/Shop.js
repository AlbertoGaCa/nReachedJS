/**
 * @file src/game/scenes/Shop.js
 * @description This scene will serve as the in-game shop where players can purchase power-ups.
 */

import { Scene } from 'phaser';

export class Shop extends Scene
{
    constructor ()
    {
        super('Shop');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x444444);

        this.add.text(512, 200, 'Welcome to the Shop!', {
            fontSize: '48px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        const continueButton = this.add.text(512, 400, 'Continue Game', {
            fontSize: '32px',
            fill: '#00ff00'
        }).setOrigin(0.5).setInteractive();

        continueButton.on('pointerdown', () => {
            console.log('Continuing Game...');
            this.scene.stop('Shop'); // Stop the Shop scene
            this.scene.resume('Game'); // Resume the Game scene
        });
    }
}
