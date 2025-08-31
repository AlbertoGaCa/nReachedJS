import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background');

        this.add.text(512, 460, 'Click to Start', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
        
        EventBus.emit('current-scene-ready', this);

        this.input.on('pointerdown', () => {
            this.changeScene();
        });
    }

    changeScene ()
    {
        this.scene.start('Game');
    }
}
