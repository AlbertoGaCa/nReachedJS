import { Physics } from 'phaser';

export class Brick extends Physics.Arcade.Image {
    constructor(scene, x, y, width, height, health) {
        super(scene, x, y, 'whitePixel');
        this.setDisplaySize(width, height);
        const colors = [0xff4136, 0x0074d9, 0x2ecc40, 0xffdc00, 0xb10dc9];
        const color = colors[Math.floor(Math.random() * colors.length)];
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
            this.text.destroy();
            this.destroy();
        }
    }
}
