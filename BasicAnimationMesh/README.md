# Basic Animation Mesh

A small Three.js demo that renders a moving, rotating icosahedron with post-processing afterimage, orbit controls, and a screenshot shortcut.

## Features
- Animated icosahedron following a circular path
- OrbitControls with damping
- Afterimage post-processing trail
- Press `s` to save a PNG screenshot

## Controls
- Drag with the mouse to rotate the mesh
- Press `s` to take a snapshot

## Run
1. Start a local static server in this folder.
2. Open `index.html` in a browser.

If you have Node.js, one quick option is:

```bash
npx serve .
```

## Project Files
- `index.html`: Loads Three.js from CDN and starts the app
- `index.js`: Scene setup, animation loop, post-processing, and input handling

## Notes
- Uses Three.js modules via `https://cdn.jsdelivr.net` import maps.
- The camera starts at `z = 5`, and the object orbits with a radius of `2`.