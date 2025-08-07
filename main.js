import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = null; // Sfondo trasparente

const camera = new THREE.PerspectiveCamera(75,  window.innerWidth / (window.innerHeight - 100), 0.1, 1000);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Trasparente, niente sfondo bianco
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Luci
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const loader = new GLTFLoader();
let pizza;

loader.load(
  'pizza.glb',
  (gltf) => {
    pizza = gltf.scene;
    pizza.position.set(0, -0.5, 0);
    pizza.scale.set(1.5, 1.5, 1.5);
    scene.add(pizza);
  },
  undefined,
  (error) => {
    console.error('Errore caricamento modello:', error);
  }
);

function animate() {
  requestAnimationFrame(animate);

  if (pizza) {
    pizza.rotation.x += 0.01;
    pizza.rotation.y += 0.01;
    pizza.rotation.z += 0.005;
  }

  renderer.render(scene, camera);
}

animate();

// Aggiorna dimensioni al resize della finestra
window.addEventListener('resize', () => {
  const container = document.getElementById('canvas-container');
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});
