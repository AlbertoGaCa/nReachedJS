import { Physics } from 'phaser';
import { Coin } from './Coin';
import { EventBus } from './EventBus';

export class Brick extends Physics.Arcade.Image {
    constructor(scene, x, y, width, height, health, isGold = false) {
        super(scene, x, y, 'whitePixel');
        this.setDisplaySize(width, height);
        this.isGold = isGold;

        let color;
        if (this.isGold) {
            color = 0xFFD700; // Gold color
        } else {
            const colors = [0xff4136, 0x0074d9, 0x2ecc40, 0xb10dc9]; // Removed gold from random colors
            color = colors[Math.floor(Math.random() * colors.length)];
        }
        this.setTint(color);
        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.health = health;
        this.text = scene.add.text(x, y, this.health, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    }

    hit() {
        this.health--;
        this.text.setText(this.health);
        if (this.health <= 0) {
            if (this.isGold) {
                const coin = new Coin(this.scene, this.x, this.y);
                EventBus.emit('coin-spawned', coin);
            }
            this.text.destroy();
            this.destroy();
        }
    }
}
