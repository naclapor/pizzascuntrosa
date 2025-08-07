import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// OrbitControls rimosso perché non serve

const container = document.getElementById('canvas-container');

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 3);

// Luci
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Caricamento modello pizza.glb dalla cartella public/pizza/
const loader = new GLTFLoader();

let pizzaModel = null;

loader.load('pizza.glb', (gltf) => {
  pizzaModel = gltf.scene;

  pizzaModel.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  pizzaModel.position.set(0, 0, 0);
  pizzaModel.scale.set(1, 1, 1);
  scene.add(pizzaModel);
}, undefined, (error) => {
  console.error('Errore caricamento modello:', error);
});

// Gestione resize
window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Animazione
function animate() {
  requestAnimationFrame(animate);

  if (pizzaModel) {
    pizzaModel.rotation.x += 0.01;
    pizzaModel.rotation.y += 0.02;
    pizzaModel.rotation.z += 0.005;
  }

  renderer.render(scene, camera);
}
animate();
