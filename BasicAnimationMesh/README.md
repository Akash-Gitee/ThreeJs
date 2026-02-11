# Lumina Canvas (Basic Animation Mesh)

[**Live Demo**](https://akash-threejs.vercel.app/)

A premium, mobile-responsive Three.js experience featuring an interactive icosahedron, dynamic post-processing, and a sleek glassmorphism UI.

## Features
- **Mobile Responsive**: Perfectly optimized for all screen sizes, from mobile phones to desktop displays.
- **Dynamic Camera**: Automatically adjusts field of view (FOV) for portrait mode to keep the object centered.
- **Interactive Mesh**: 
  - **Auto-Animation**: The icosahedron follows an elegant circular path when idle.
  - **Drag Interaction**: Directly interact with the mesh to move it; auto-animation pauses during interaction.
- **Visual Effects**: High-quality afterimage post-processing trail for smooth motion blur effects.
- **Glassmorphism UI**: A modern, translucent interface built with vanilla CSS.
- **Scene Snapshot**: Capture the beauty of the scene with a quick shortcut or button.

## Controls
- **Mouse/Touch Drag**: Move the mesh around the scene.
- **Right-Click/Double-Drag**: Orbit the camera.
- **Press `S`**: Take a PNG snapshot of the current scene.
- **Snap Button**: Click the button in the UI to save the scene.

## Getting Started
1. Start a local static server in this folder.
2. Open `index.html` in your browser.

Quick start with Node.js:
```bash
npx serve .
```

## Project Structure
- `index.html`: Modern responsive layout with glassmorphism UI overlay.
- `index.js`: Three.js engine, interactive logic, and responsive resize handlers.

## Technical Notes
- **Resolution**: Uses high-DPI pixel ratio support for sharp visuals on Retina displays.
- **Tech Stack**: Vanilla Three.js, EffectComposer, and Inter typography.
- **Resizing**: Real-time updates for renderer, composer, and camera aspect ratios.