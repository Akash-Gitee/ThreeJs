import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  // Create basic geometries
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00});
  const cube = new THREE.Mesh(geometry, cubeMaterial);
  scene.add(cube);
  cube.position.x = -4;
  cube.name = 'Cube';
  cube.castShadow = true;

  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x0099ff});
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);
  sphere.position.x = -2;
  sphere.name = 'Sphere';
  sphere.castShadow = true;

  // Create a plane with a procedural texture
  const planeGeometry = new THREE.PlaneGeometry(3, 2);
        
  const texture = new THREE.TextureLoader().load('Assets/texture.jpg');
  const planeMaterial = new THREE.MeshStandardMaterial({map: texture});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);
  plane.position.x = 5;
  plane.name = 'Plane';
  plane.receiveShadow = true;

//cylinder
  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 16);
  const cylinderMaterial = new THREE.MeshStandardMaterial({color: 0xff6600});
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  scene.add(cylinder);
  cylinder.position.set(-1, 0, -2);
  cylinder.name = 'Gas Cylinder';
  cylinder.castShadow = true;

  // Add a torus for variety
  const torusGeometry = new THREE.TorusGeometry(0.7, 0.3, 16, 100);
  const torusMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff});
  const torus = new THREE.Mesh(torusGeometry, torusMaterial);
  scene.add(torus);
  torus.position.set(-7, 0, -1);
  torus.name = 'Torus';
  torus.castShadow = true;

  //GltfLoader
  const gltfloader = new GLTFLoader();
  gltfloader.load('Assets/scene.gltf', (gltf) => {
      const model = gltf.scene;
      model.position.set(1, 0, 0);
      model.name = 'GLTF Model';
      model.castShadow = true;
      scene.add(model);
      })
  // Raycaster for mouse interaction
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let selectedObject = null;

  document.addEventListener('click', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    // Reset previous selection
    if (selectedObject && selectedObject.material) {
        selectedObject.material.emissive.setHex(0x000000);
    }

    if (intersects.length > 0) {
        const hit = intersects[0].object;
        selectedObject = hit;

        console.log('Clicked:', hit.name || 'Unnamed Object');
        
        // Highlight the object
        if (hit.material) {
            hit.material.emissive.setHex(0x444444);
        
        // Update info display
        const infoDiv = document.getElementById('info');
        if (infoDiv) {
            infoDiv.textContent = `Selected: ${hit.name || 'Unnamed Object'}`;
        }
      }
    }
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Simple orbit controls implementation
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let rotationX = 0;
    let rotationY = 0;

     document.addEventListener('mousedown', (e) => {
         if (e.button === 0) { // Left mouse button
             isMouseDown = true;
             mouseX = e.clientX;
             mouseY = e.clientY;
         }
     });
      document.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        document.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                const deltaX = e.clientX - mouseX;
                const deltaY = e.clientY - mouseY;
                
                targetX += deltaY * 0.01;
                targetY += deltaX * 0.01;
                
                mouseX = e.clientX;
                mouseY = e.clientY;
            }
        });

        // Zoom with mouse wheel
        document.addEventListener('wheel', (e) => {
            camera.position.z += e.deltaY * 0.01;
            camera.position.z = Math.max(2, Math.min(20, camera.position.z));
        });

        // Set initial camera position
        camera.position.set(0, 2, 5);
        camera.lookAt(0, 0, 0);

        // Animation loop
        function animate() {
            // Rotate cube
            if (cube) {
                cube.rotation.y += 0.01;
                cube.rotation.x += 0.005;
            }
            // Animate sphere
            if (sphere) {
                const time = performance.now() * 0.001;
                sphere.position.y = Math.sin(time * 2) * 0.5;
            }
            // Animate plane
            if (plane) {
                const time = performance.now() * 0.001;
                plane.position.y = Math.sin(time) * 0.3 + 0.5;
                plane.rotation.z = Math.sin(time * 0.5) * 0.1;
            }
            // Animate torus
            if (torus) {
                const time = performance.now() * 0.001;
                torus.rotation.x += 0.01;
                torus.rotation.y += 0.02;
            }
            // Animate cylinder
            if (cylinder) {
                const time = performance.now() * 0.001;
                cylinder.rotation.y += 0.005;
            }
            // Smooth camera rotation
            rotationX += (targetX - rotationX) * 0.05;
            rotationY += (targetY - rotationY) * 0.05;
            
            // Apply rotation to camera position
            const radius = camera.position.length();
            camera.position.x = Math.sin(rotationY) * Math.cos(rotationX) * radius;
            camera.position.y = Math.sin(rotationX) * radius;
            camera.position.z = Math.cos(rotationY) * Math.cos(rotationX) * radius;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();