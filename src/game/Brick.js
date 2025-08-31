import { GameObjects } from 'phaser';

export class Brick extends GameObjects.Rectangle {
    constructor(scene, x, y, width, height, health) {
        const colors = [0xff4136, 0x0074d9, 0x2ecc40, 0xffdc00, 0xb10dc9];
        const color = colors[Math.floor(Math.random() * colors.length)];
        super(scene, x, y, width, height, color);
        scene.add.existing(this);
        scene.physics.add.existing(this, true);

        this.health = health;
        this.text = scene.add.text(x, y, this.health, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    }

    hit() {
        this.health--;
        this.text.setText(this.health);
        if (this.health <= 0) {
            this.text.destroy();
            this.destroy();
        }
    }
}
