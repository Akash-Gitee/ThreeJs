import * as Three from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,10);
const renderer = new Three.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new Three.BoxGeometry(1,1,1);
const cubeMaterial = new Three.MeshStandardMaterial({color: 0x00ff00});
const cube = new Three.Mesh(geometry, cubeMaterial);
scene.add(cube);
cube.position.x = -2;
cube.name = 'Cube';

const sphereGeometry = new Three.SphereGeometry(1,32,32);
const sphereMaterial = new Three.MeshStandardMaterial({color: 0x00ff00});
const sphere = new Three.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.x = 0;
sphere.name = 'Sphere';

const textureLoader = new Three.TextureLoader();
const planetexture = textureLoader.load('./Assets/texture.jpg');

const planeGeometry = new Three.PlaneGeometry(4,3);
const planeMaterial = new Three.MeshBasicMaterial({color: 0xffffff, map: planetexture});
const plane = new Three.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.position.x = 2;
// plane.rotateX(-1.5);
plane.name = 'Plane';

const raycaster = new Three.Raycaster();
const mouse = new Three.Vector2();

document.addEventListener('click',(e)=>{
    mouse.x = (e.clientX / window.innerWidth) * 2-1;
    mouse.y = -(e.clientY / window.innerHeight) * 2+1;

    raycaster.setFromCamera(mouse,camera);

    const intersects = raycaster.intersectObjects(scene.children,true);

    if (intersects.length > 0) {
    const hit = intersects[0].object;

    // Log or display the object's name
    console.log('Clicked:', hit.name || 'Unnamed Object');

    // Highlight the object (optional)
    if (hit.material && hit.material.color) {
      hit.material.color.set(0xff0000); // Red
    }

    // Update info box (optional)
    // const infoBox = document.getElementById('info-box');
    // if (infoBox) {
    //   infoBox.textContent = `Clicked: ${hit.name || 'Object'}`;
    // }
  }
});

const ambientlight = new Three.AmbientLight(0xffffff,1);
scene.add(ambientlight);

const directlight = new Three.DirectionalLight(0xffffff,1);
directlight.position.set(0,0,1);
scene.add(directlight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

camera.position.z = 5;

function animate() {
    controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

animate();