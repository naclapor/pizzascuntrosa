import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfff8ec);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;  // Più lontano
camera.position.y = 0.5; // Più in alto

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Luci
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); // luce soffusa
scene.add(ambientLight);

// Caricamento modello
const loader = new GLTFLoader();
let pizza;

loader.load(
  'pizza.glb',
  (gltf) => {
    pizza = gltf.scene;
    pizza.position.set(0, -0.5, 0); // Alza leggermente il modello
    pizza.scale.set(1.5, 1.5, 1.5); // Scala se necessario
    scene.add(pizza);
  },
  undefined,
  (error) => {
    console.error('Errore caricamento modello:', error);
  }
);

// Animazione
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
