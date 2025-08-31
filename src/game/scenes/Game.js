import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Ball } from '../Ball';
import { Brick } from '../Brick';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
        this.turn = 1;
        this.isBallMoving = false;
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x222222);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        this.scoreText = this.add.text(16, 16, 'Turn: 1', { fontSize: '32px', fill: '#fff' });

        this.ball = new Ball(this, 512, 700, 10);

        this.bricks = this.physics.add.staticGroup();

        this.spawnBricks();

        this.trajectoryLine = this.add.graphics({ lineStyle: { width: 2, color: 0xffffff, alpha: 0.5 } });

        this.physics.add.collider(this.ball, this.bricks, (ball, brick) => {
            brick.hit();
        });

        this.input.on('pointermove', (pointer) => {
            if (!this.isBallMoving)
            {
                this.trajectoryLine.clear();
                const angle = Phaser.Math.Angle.Between(this.ball.x, this.ball.y, pointer.x, pointer.y);
                const invertedAngle = Phaser.Math.Angle.Reverse(angle);

                if (pointer.y > this.ball.y)
                {
                    const line = new Phaser.Geom.Line(this.ball.x, this.ball.y, this.ball.x + Math.cos(invertedAngle) * 1000, this.ball.y + Math.sin(invertedAngle) * 1000);
                    const points = line.getPoints(0, 10);
                    for (let i = 0; i < points.length; i += 2) {
                        if (i + 1 < points.length) {
                            this.trajectoryLine.strokeLineShape(new Phaser.Geom.Line(points[i].x, points[i].y, points[i+1].x, points[i+1].y));
                        }
                    }
                }
            }
        });

        this.input.on('pointerdown', (pointer) => {
            if (!this.isBallMoving)
            {
                const angle = Phaser.Math.Angle.Between(this.ball.x, this.ball.y, pointer.x, pointer.y);
                const invertedAngle = Phaser.Math.Angle.Reverse(angle);
                this.ball.body.setVelocity(Math.cos(invertedAngle) * 600, Math.sin(invertedAngle) * 600);
                this.isBallMoving = true;
                this.trajectoryLine.clear();
            }
        });

        EventBus.emit('current-scene-ready', this);
    }

    spawnBricks()
    {
        for (let i = 0; i < 7; i++) {
            this.bricks.add(new Brick(this, 100 + i * 120, 100, 100, 50, this.turn));
        }
    }

    moveBricks()
    {
        this.bricks.getChildren().forEach(brick => {
            brick.y += 60;
            brick.text.y += 60;
        });
    }

    update()
    {
        if (this.ball.body.y > 750 && this.isBallMoving)
        {
            const lastX = this.ball.body.x;
            this.ball.body.setVelocity(0, 0);
            this.ball.body.y = 700;
            this.ball.body.x = lastX;
            this.isBallMoving = false;
            this.turn++;
            this.scoreText.setText('Turn: ' + this.turn);
            this.moveBricks();
            this.spawnBricks();
            this.checkGameOver();
        }
    }

    checkGameOver()
    {
        this.bricks.getChildren().forEach(brick => {
            if (brick.y > 700)
            {
                this.changeScene();
            }
        });
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
