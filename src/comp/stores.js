import { writable, readable } from 'svelte/store';
export const posts = writable([]);
export const formActive = writable(false);
export const filter = writable([]);