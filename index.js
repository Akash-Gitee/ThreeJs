import * as Three from 'three';
import { OBJLoader} from 'three/addons/loaders/OBJLoader.js';

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new Three.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function gltf(geometry){
// const geometry = new Three.BoxGeometry( 1, 1, 1 );
const material = new Three.MeshStandardMaterial( { color: 0x00ffff } );
const Mesh = new Three.Mesh( geometry, material );
scene.add( Mesh );

camera.position.z = 5;

const light = new Three.DirectionalLight( 0xffffff, 1 ); 
light.position.set( 0, 0, 1 );
scene.add( light );

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );   
}
animate();
}
const Loader = new OBJLoader();
Loader.load('Assets/cube.obj', (obj)=> gltf(obj.children[0].geometry) )