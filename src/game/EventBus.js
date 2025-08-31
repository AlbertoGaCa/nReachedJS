/**
 * @file src/game/EventBus.js
 * @description A simple event bus implementation using Phaser's EventEmitter.
 * This is used for communication between different parts of the application,
 * including Phaser scenes, Vue components, and other game objects.
 */

import Phaser from 'phaser';

// Export a new instance of Phaser.Events.EventEmitter as EventBus.
// This allows different parts of the application to subscribe to and emit custom events.
export const EventBus = new Phaser.Events.EventEmitter();
