import * as Three from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DragControls } from 'three/addons/controls/DragControls.js';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js'

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,10);
const renderer = new Three.WebGLRenderer({antialias:true, preserveDrawingBuffer: true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

//geometry
const geometry = new Three.IcosahedronGeometry(1.0,);
const material = new Three.MeshStandardMaterial({
    color:0xffffff,
    flatShading:true,
    // wireframe:true
});
const Icosahedron = new Three.Mesh(geometry,material);
scene.add(Icosahedron);

//wiremesh
const wirematerial = new Three.MeshBasicMaterial({color : 0xffffff ,wireframe : true})
const wiremesh = new Three.Mesh(geometry,wirematerial)
// Icosahedron.add(wiremesh);

// postprocessing
const composer = new EffectComposer(renderer);
const renderScene = new RenderPass(scene,camera);
const affterImagePass = new AfterimagePass();
affterImagePass.uniforms["damp"].value = 0.96;
composer.addPass(renderScene);
composer.addPass(affterImagePass);

//orbit controls
const OrbitCtrl = new OrbitControls(camera,renderer.domElement)
OrbitCtrl.enableDamping = true;
OrbitCtrl.dampingFactor = 0.03;

//drag controls
const dragControls = new DragControls([Icosahedron], camera, renderer.domElement);

dragControls.addEventListener('dragstart', function () {
    OrbitCtrl.enabled = false;
});

dragControls.addEventListener('dragend', function () {
    OrbitCtrl.enabled = true;
});

camera.position.z = 5;

//light
//Hemispherelight is like light passing from sun to ground(top to bottom) parameter is toplight,bottomlight,intensity
const light = new Three.HemisphereLight(0x0099ff,0xaa5500,1);
light.position.set(0,1,0)
scene.add(light);

let isDragging = false;
dragControls.addEventListener('dragstart', () => isDragging = true);
dragControls.addEventListener('dragend', () => isDragging = false);

//animate function
const animate = function() {
    const time = Date.now() * 0.001; // Time in seconds

    if (!isDragging) {
        // Circular path
        const radius = 2; // Radius of the circular path
        Icosahedron.position.x = Math.cos(time) * radius;
        Icosahedron.position.y = Math.sin(time) * radius;
        
        // Rotation
        Icosahedron.rotation.x += 0.01;
        Icosahedron.rotation.y += 0.01;
        Icosahedron.rotation.z += 0.01;
    }

    composer.render(scene, camera);
    OrbitCtrl.update();
    requestAnimationFrame(animate);
};
animate();

//resize canvas
window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
})

//generate image and download
function SaveImage(){
    renderer.render(scene,camera);
    const image = renderer.domElement.toDataURL('image/png',1.0); //encoded as base64 string formate
    const link = document.createElement('a');
    link.setAttribute('href',image);
    link.setAttribute('target','_blank');
    link.setAttribute('download','scene.png');
    link.click();
}

document.getElementById('snap-btn').addEventListener('click', SaveImage);

window.addEventListener('keydown',(e)=>{
    if (e.key === 's'){
        SaveImage()
    }
})
