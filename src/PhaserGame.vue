<script setup>
/**
 * @file src/PhaserGame.vue
 * @description This Vue.js component is responsible for embedding and managing the Phaser game instance within the Vue application.
 * It handles the mounting and unmounting of the Phaser game and communicates with the main App.vue component.
 */

import { onMounted, onUnmounted, ref } from 'vue';
import { EventBus } from './game/EventBus';
import StartGame from './game/main';

// Reactive reference to store the current active Phaser scene instance
const scene = ref();
// Reactive reference to store the Phaser game instance
const game = ref();

// Define custom events that this component can emit
const emit = defineEmits(['current-active-scene']);

/**
 * Lifecycle hook: Called after the component has been mounted.
 * Initializes the Phaser game and sets up an event listener for scene changes.
 */
onMounted(() => {

    // Start the Phaser game and attach it to the 'game-container' DOM element
    game.value = StartGame('game-container');

    // Listen for the 'current-scene-ready' event emitted by Phaser scenes
    EventBus.on('current-scene-ready', (currentScene) => {

        // Emit a custom event to the parent component with the current active scene
        emit('current-active-scene', currentScene);

        // Store the current active scene instance
        scene.value = currentScene;

    });

});

/**
 * Lifecycle hook: Called before the component is unmounted.
 * Destroys the Phaser game instance to prevent memory leaks.
 */
onUnmounted(() => {

    if (game.value)
    {
        game.value.destroy(true); // Destroy the Phaser game instance
        game.value = null; // Clear the reference
    }
    
});

// Expose the scene and game instances to the parent component
defineExpose({ scene, game });
</script>

<template>
    <!-- The DOM element where the Phaser game canvas will be injected -->
    <div id="game-container"></div>
</template>
