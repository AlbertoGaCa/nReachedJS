import { Physics } from 'phaser';

export class Coin extends Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'star'); // Assuming 'star' is a suitable temporary asset for a coin
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setOrigin(0.5);
        this.setScale(0.5); // Adjust size as needed
        this.setTint(0xFFD700); // Gold color

        // Make it a non-colliding overlap trigger
        this.body.setAllowGravity(false);
        this.body.setCollideWorldBounds(false);
    }

    collect() {
        this.destroy();
    }
}
