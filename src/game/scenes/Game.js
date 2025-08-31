import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { Ball } from '../Ball';
import { Brick } from '../Brick';
import { Coin } from '../Coin';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.turn = 1;
        this.isBallMoving = false;

        this.cameras.main.setBackgroundColor(0x222222);

        this.add.image(512, 384, 'background').setAlpha(0.5);

                this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        this.score = 0;

        this.goldText = this.add.text(16, 50, 'Gold: 0', { fontSize: '32px', fill: '#FFD700' });
        this.gold = 0;

        this.ball = new Ball(this, 512, 700, 10);

        this.bricks = this.physics.add.staticGroup();
        this.coins = this.physics.add.group();

        this.spawnBricks();

        this.trajectoryLine = this.add.graphics({ lineStyle: { width: 2, color: 0xffffff, alpha: 0.5 } });

        this.physics.add.collider(this.ball, this.bricks, (ball, brick) => {
            brick.hit();
        });

        this.physics.add.overlap(this.ball, this.coins, this.collectCoin, null, this);

        EventBus.on('coin-spawned', (coin) => {
            this.coins.add(coin);
        }, this);

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
            if (!this.isBallMoving && pointer.y > this.ball.y)
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
            const isGold = Math.random() < 0.2; // 20% chance to be a gold brick
            this.bricks.add(new Brick(this, 100 + i * 120, 100, 100, 50, this.turn, isGold));
        }
    }

    moveBricks()
    {
        this.bricks.getChildren().forEach(brick => {
            brick.y += 60;
            brick.text.y += 60;
            brick.refreshBody();
        });

        this.coins.getChildren().forEach(coin => {
            coin.y += 60;
        });
    }

    collectCoin(ball, coin) {
        coin.collect();
        this.gold++;
        this.goldText.setText('Gold: ' + this.gold);
    }

    update()
    {
        if (this.isBallMoving && this.ball.body.y >= 700 && this.ball.body.velocity.y > 0)
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
