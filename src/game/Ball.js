import { GameObjects } from 'phaser';

export class Ball extends GameObjects.Arc {
    constructor(scene, x, y, radius) {
        super(scene, x, y, radius, 0, 360, false, 0xADD8E6);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(1, 1);
    }
}
