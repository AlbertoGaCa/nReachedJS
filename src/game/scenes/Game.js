/**
 * @file src/game/scenes/Game.js
 * @description The main game scene where the BBTAN gameplay takes place.
 * This scene manages the ball, bricks, coins, UI, and game logic.
 */

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

    /**
     * Initializes the Game scene.
     * This method is called once when the scene is created.
     */
    create ()
    {
        // Game state variables
        this.turn = 1; // Current turn number
        this.isBallMoving = false; // Flag to track if the ball is currently in motion
        this.ballSpeed = 700; // Initial ball speed
        this.maxBallSpeed = 1500; // Maximum ball speed to prevent it from becoming too fast
        this.ballSpeedIncreaseRate = 5; // How much to increase speed per update cycle

        // Set the background color of the camera
        this.cameras.main.setBackgroundColor(0x222222);

        // Add a background image with some transparency
        this.add.image(512, 384, 'background').setAlpha(0.5);

        // Score display
        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });

        // Turn display
        this.turnText = this.add.text(16, 50, 'Turn: ' + this.turn, { fontSize: '32px', fill: '#000' });

        // Gold display
        this.goldText = this.add.text(16, 84, 'Gold: 0', { fontSize: '32px', fill: '#FFD700' });
        this.gold = 0;

        // Create the player's ball
        this.ball = new Ball(this, 512, 700, 10);

        // Create static groups for bricks and dynamic group for coins
        this.bricks = this.physics.add.staticGroup();
        this.coins = this.physics.add.group();

        // Spawn the initial set of bricks
        this.spawnBricks();

        // Graphics object for drawing the trajectory line
        this.trajectoryLine = this.add.graphics({ lineStyle: { width: 2, color: 0xffffff, alpha: 0.5 } });

        // Set up collision between the ball and bricks
        this.physics.add.collider(this.ball, this.bricks, (ball, brick) => {
            brick.hit(); // Call the hit method on the brick when collided
        });

        // Set up overlap between the ball and coins
        this.physics.add.overlap(this.ball, this.coins, this.collectCoin, null, this);

        // Listen for the 'coin-spawned' event from Brick objects
        EventBus.on('coin-spawned', (coin) => {
            this.coins.add(coin); // Add the newly spawned coin to the coins group
        }, this);

        // Listen for the 'brick-destroyed' event from Brick objects
        EventBus.on('brick-destroyed', (scoreValue) => {
            this.score += scoreValue; // Add the brick's score value to the total score
            this.scoreText.setText('Score: ' + this.score); // Update score display
        }, this);

        // Input handler for drawing the trajectory line on pointer movement
        this.input.on('pointermove', (pointer) => {
            if (!this.isBallMoving)
            {
                this.trajectoryLine.clear(); // Clear previous trajectory line
                const angle = Phaser.Math.Angle.Between(this.ball.x, this.ball.y, pointer.x, pointer.y); // Angle from ball to pointer
                const invertedAngle = Phaser.Math.Angle.Reverse(angle); // Inverted angle for shooting direction

                if (pointer.y > this.ball.y) // Only draw if pointer is below the ball
                {
                    // Draw a dashed trajectory line
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

        // Input handler for launching the ball on pointer down
        this.input.on('pointerdown', (pointer) => {
            if (!this.isBallMoving && pointer.y > this.ball.y) // Only launch if ball is not moving and pointer is below the ball
            {
                const angle = Phaser.Math.Angle.Between(this.ball.x, this.ball.y, pointer.x, pointer.y);
                const invertedAngle = Phaser.Math.Angle.Reverse(angle);
                // Set ball velocity based on angle and current ball speed
                this.ball.body.setVelocity(Math.cos(invertedAngle) * this.ballSpeed, Math.sin(invertedAngle) * this.ballSpeed);
                this.isBallMoving = true; // Set ball moving flag
                this.trajectoryLine.clear(); // Clear trajectory line after launch
            }
        });

        // Emit an event to indicate that the current scene is ready
        EventBus.emit('current-scene-ready', this);
    }

    /**
     * Spawns a new row of bricks at the top of the screen.
     * Bricks are spawned with a probability, creating gaps.
     */
    spawnBricks()
    {
        for (let i = 0; i < 7; i++) {
            const shouldSpawn = Math.random() < 0.7; // 70% chance to spawn a brick
            if (shouldSpawn) {
                const isGold = Math.random() < 0.2; // 20% chance to be a gold brick
                this.bricks.add(new Brick(this, 100 + i * 120, 100, 100, 50, this.turn, isGold));
            }
        }
    }

    /**
     * Moves all existing bricks and coins down by a fixed amount.
     */
    moveBricks()
    {
        // Move bricks down
        this.bricks.getChildren().forEach(brick => {
            brick.y += 60;
            brick.text.y += 60;
            brick.refreshBody(); // Update physics body position
        });

        // Move coins down
        this.coins.getChildren().forEach(coin => {
            coin.y += 60;
        });
    }

    /**
     * Callback function for when the ball overlaps with a coin.
     * @param {Phaser.Physics.Arcade.Sprite} ball - The ball object.
     * @param {Coin} coin - The coin object.
     */
    collectCoin(ball, coin) {
        coin.collect(); // Destroy the coin
        this.gold++; // Increment gold count
        this.goldText.setText('Gold: ' + this.gold); // Update gold display
    }

    /**
     * The main update loop for the scene.
     * @param {number} time - The current game time.
     * @param {number} delta - The time elapsed since the last frame.
     */
    update()
    {
        // Gradually increase ball speed if it's moving
        if (this.isBallMoving) {
            const currentSpeed = this.ball.body.speed;
            if (currentSpeed < this.maxBallSpeed) {
                const newSpeed = Math.min(currentSpeed + this.ballSpeedIncreaseRate, this.maxBallSpeed);
                // Scale the velocity vector to the new speed
                this.ball.body.setVelocity(this.ball.body.velocity.x * (newSpeed / currentSpeed),
                                           this.ball.body.velocity.y * (newSpeed / currentSpeed));
            }
        }

        // Check if the ball has returned to the bottom of the screen
        if (this.isBallMoving && this.ball.body.y >= 700 && this.ball.body.velocity.y > 0)
        {
            const lastX = this.ball.body.x;
            this.ball.body.setVelocity(0, 0); // Stop the ball
            this.ball.body.y = 700; // Reset ball position
            this.ball.body.x = lastX;
            this.isBallMoving = false; // Set ball moving flag to false
            this.turn++; // Increment turn count
            this.turnText.setText('Turn: ' + this.turn); // Update turn display
            this.moveBricks(); // Move bricks down
            this.spawnBricks(); // Spawn new bricks
            this.checkGameOver(); // Check for game over condition
        }
    }

    /**
     * Checks if the game over condition is met (any brick goes below a certain Y-coordinate).
     */
    checkGameOver()
    {
        this.bricks.getChildren().forEach(brick => {
            if (brick.y > 700)
            {
                this.changeScene(); // Transition to game over scene
            }
        });
    }

    /**
     * Transitions to the GameOver scene.
     */
    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
