<script setup>
/**
 * @file src/App.vue
 * @description This is the main Vue.js component that serves as the entry point for the frontend application.
 * It hosts the Phaser game instance within its template and provides UI elements for interacting with the game.
 * Note: Some functions and UI elements in this file are remnants from the initial project template and are not
 * directly used by the BBTAN game logic.
 */

import Phaser from 'phaser';
import { ref, toRaw } from 'vue';
import PhaserGame from './PhaserGame.vue';

// Reactive reference to control if the sprite can be moved (used by template UI, not core game logic)
const canMoveSprite = ref();

// References to the PhaserGame component, allowing access to the game and scene instances
const phaserRef = ref();
// Reactive reference to store sprite position (used by template UI, not core game logic)
const spritePosition = ref({ x: 0, y: 0 });

/**
 * Function to change the active scene in the Phaser game.
 * This is a template function and not directly used by the BBTAN game's scene management.
 */
const changeScene = () => {

    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
        // Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
        scene.changeScene();
    }

}

/**
 * Function to toggle sprite movement.
 * This is a template function and not directly used by the BBTAN game.
 */
const moveSprite = () => {

    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
        // Call the `moveLogo` method in the `MainMenu` Scene and capture the sprite position
        scene.moveLogo(({ x, y }) => {

            spritePosition.value = { x, y };

        });
    }

}

/**
 * Function to add a new sprite to the current scene at a random position.
 * This is a template function and not directly used by the BBTAN game.
 */
const addSprite = () => {

    const scene = toRaw(phaserRef.value.scene);

    if (scene)
    {
        // Add a new sprite to the current scene at a random position
        const x = Phaser.Math.Between(64, scene.scale.width - 64);
        const y = Phaser.Math.Between(64, scene.scale.height - 64);

        // `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
        const star = scene.add.sprite(x, y, 'star');

        // Create a Phaser Tween to fade the star sprite in and out.
        scene.add.tween({
            targets: star,
            duration: 500 + Math.random() * 1000,
            alpha: 0,
            yoyo: true,
            repeat: -1
        });
    }

}

/**
 * Event handler for 'current-active-scene' emitted from the PhaserGame component.
 * Updates `canMoveSprite` based on the active scene key.
 */
const currentScene = (scene) => {

    canMoveSprite.value = (scene.scene.key !== 'MainMenu');

}
</script>

<template>
    <!-- The PhaserGame component which embeds and manages the Phaser game instance -->
    <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />

    <!-- UI elements for interacting with the game (mostly from template, not core BBTAN game) -->
    <div>
        <div>
            <button class="button" @click="changeScene">Change Scene</button>
        </div>
        <div>
            <button :disabled="canMoveSprite" class="button" @click="moveSprite">Toggle Movement</button>
        </div>
        <div class="spritePosition">Sprite Position:
            <pre>{{ spritePosition }}</pre>
        </div>
        <div>
            <button class="button" @click="addSprite">Add New Sprite</button>
        </div>
    </div>
</template>
